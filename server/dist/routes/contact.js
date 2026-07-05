import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Path to contacts data file
const DATA_DIR = path.resolve(__dirname, '../../data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
/**
 * Validates a phone number: must be exactly 11 digits starting with 1.
 */
function validatePhone(phone) {
    return /^1\d{10}$/.test(phone);
}
/**
 * Validates contact form data on the server side.
 */
function validateContactForm(data) {
    const errors = {};
    const name = typeof data.name === 'string' ? data.name : '';
    const phone = typeof data.phone === 'string' ? data.phone : '';
    const organization = typeof data.organization === 'string' ? data.organization : '';
    const intention = typeof data.intention === 'string' ? data.intention : '';
    if (!name.trim()) {
        errors.name = '联系人姓名为必填项';
    }
    if (!phone.trim()) {
        errors.phone = '手机号码为必填项';
    }
    else if (!validatePhone(phone.trim())) {
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
function ensureDataFile() {
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
function readContacts() {
    ensureDataFile();
    try {
        const raw = fs.readFileSync(CONTACTS_FILE, 'utf-8');
        return JSON.parse(raw);
    }
    catch {
        return [];
    }
}
/**
 * Appends a new contact submission to the JSON file.
 */
function saveContact(contact) {
    const contacts = readContacts();
    contacts.push(contact);
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf-8');
}
/**
 * Generates a simple unique ID.
 */
function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
// POST /api/contact
router.post('/', (req, res) => {
    try {
        const body = req.body;
        // Validate
        const errors = validateContactForm(body);
        if (Object.keys(errors).length > 0) {
            res.status(400).json({ success: false, errors });
            return;
        }
        // Build submission record
        const submission = {
            id: generateId(),
            name: body.name.trim(),
            phone: body.phone.trim(),
            organization: body.organization.trim(),
            intention: body.intention.trim(),
            submittedAt: new Date().toISOString(),
        };
        // Save to file
        saveContact(submission);
        res.status(200).json({ success: true, message: '提交成功' });
    }
    catch (error) {
        console.error('Contact form submission error:', error);
        res.status(500).json({ success: false, message: '服务器内部错误，请稍后重试' });
    }
});
export default router;
//# sourceMappingURL=contact.js.map