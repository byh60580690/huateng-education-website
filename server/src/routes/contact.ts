import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to contacts data file
const DATA_DIR = path.resolve(__dirname, '../../data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  organization: string;
  intention: string;
  submittedAt: string;
}

interface ContactFormErrors {
  name?: string;
  phone?: string;
  organization?: string;
  intention?: string;
}

/**
 * Validates a phone number: must be exactly 11 digits starting with 1.
 */
function validatePhone(phone: string): boolean {
  return /^1\d{10}$/.test(phone);
}

/**
 * Validates contact form data on the server side.
 */
function validateContactForm(data: Record<string, unknown>): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const name = typeof data.name === 'string' ? data.name : '';
  const phone = typeof data.phone === 'string' ? data.phone : '';
  const organization = typeof data.organization === 'string' ? data.organization : '';
  const intention = typeof data.intention === 'string' ? data.intention : '';

  if (!name.trim()) {
    errors.name = '联系人姓名为必填项';
  }

  if (!phone.trim()) {
    errors.phone = '手机号码为必填项';
  } else if (!validatePhone(phone.trim())) {
    errors.phone = '请输入正确的手机号码格式（11位数字，以1开头）';
  }

  if (!organization.trim()) {
    errors.organization = '院校或企业名称为必填项';
  }

  if (!intention.trim()) {
    errors.intention = '合作意向或需求为必填项';
  }

  return errors;
}

/**
 * Ensures the data directory and contacts file exist.
 */
function ensureDataFile(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(CONTACTS_FILE)) {
    fs.writeFileSync(CONTACTS_FILE, '[]', 'utf-8');
  }
}

/**
 * Reads existing contacts from the JSON file.
 */
function readContacts(): ContactSubmission[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(CONTACTS_FILE, 'utf-8');
    return JSON.parse(raw) as ContactSubmission[];
  } catch {
    return [];
  }
}

/**
 * Appends a new contact submission to the JSON file.
 */
function saveContact(contact: ContactSubmission): void {
  const contacts = readContacts();
  contacts.push(contact);
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf-8');
}

/**
 * Generates a simple unique ID.
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// POST /api/contact
router.post('/', (req: Request, res: Response): void => {
  try {
    const body = req.body as Record<string, unknown>;

    // Validate
    const errors = validateContactForm(body);
    if (Object.keys(errors).length > 0) {
      res.status(400).json({ success: false, errors });
      return;
    }

    // Build submission record
    const submission: ContactSubmission = {
      id: generateId(),
      name: (body.name as string).trim(),
      phone: (body.phone as string).trim(),
      organization: (body.organization as string).trim(),
      intention: (body.intention as string).trim(),
      submittedAt: new Date().toISOString(),
    };

    // Save to file
    saveContact(submission);

    res.status(200).json({ success: true, message: '提交成功' });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ success: false, message: '服务器内部错误，请稍后重试' });
  }
});

export default router;
