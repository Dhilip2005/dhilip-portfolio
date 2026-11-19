import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

const app = express();
const port = Number(process.env.PORT || 3001);
const clientDist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../client/dist");

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "12kb" }));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.post(
  "/api/contact",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    handler: (_req, res) => res.status(429).json({ error: "Too many messages. Please try again later." })
  }),
  async (req, res) => {
    const { name, email, subject, message, website } = req.body ?? {};

    if (website) return res.status(400).json({ error: "Invalid submission." });
    if (![name, email, subject, message].every((value) => typeof value === "string" && value.trim())) {
      return res.status(400).json({ error: "Please complete every field." });
    }
    if (name.length > 100 || email.length > 254 || subject.length > 160 || message.length > 5000) {
      return res.status(400).json({ error: "One or more fields exceed the allowed length." });
    }
    if (/[\r\n]/.test(subject)) {
      return res.status(400).json({ error: "Subject must be a single line." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Enter a valid email address." });
    }
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_TO || !process.env.CONTACT_FROM) {
      return res.status(503).json({ error: "Contact email delivery is not configured yet. Please connect through the social links." });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });
      await transporter.sendMail({
        from: process.env.CONTACT_FROM,
        to: process.env.CONTACT_TO,
        replyTo: email,
        subject: `Portfolio enquiry: ${subject.trim()}`,
        text: `From: ${name.trim()} <${email.trim()}>\n\n${message.trim()}`
      });
      return res.status(200).json({ message: "Message sent successfully." });
    } catch (error) {
      console.error("Contact email delivery failed:", error);
      return res.status(502).json({ error: "The message could not be delivered. Please try again later." });
    }
  }
);

app.use(express.static(clientDist));
app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api/")) return next();
  return res.sendFile(path.join(clientDist, "index.html"), (error) => {
    if (error) next(error);
  });
});
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) return res.status(404).json({ error: "API endpoint not found." });
  return next();
});

app.use((error, _req, res, next) => {
  if (error?.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Request body must be valid JSON." });
  }
  if (error?.type === "entity.too.large") {
    return res.status(413).json({ error: "Request body is too large." });
  }
  return next(error);
});

app.listen(port, () => console.log(`Portfolio API listening on port ${port}`));
