/**
 * Phase 0 Dirty Dozen Security Test Specification for LTSCP Digital Seva & Cyber Cafe.
 * Designed for execution against Firebase Rules Unit Testing when emulator is active.
 */

export const DIRTY_DOZEN_CASES = [
  {
    name: '1. Unauthenticated get/list on enquiries is denied (PII isolation)',
    collection: 'enquiries',
    operation: 'read',
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '2. Regular authenticated user cannot read enquiries',
    collection: 'enquiries',
    operation: 'list',
    auth: { uid: 'visitor-1', email: 'visitor@example.com', email_verified: true },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '3. Enquiry create with spoofed status=Completed is denied',
    collection: 'enquiries',
    operation: 'create',
    payload: { status: 'Completed', adminRemarks: '', source: 'website_form' },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '4. Enquiry create with shadow field isVerified=true is denied',
    collection: 'enquiries',
    operation: 'create',
    payload: { isVerified: true },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '5. Enquiry create with forged client timestamp is denied',
    collection: 'enquiries',
    operation: 'create',
    payload: { createdAt: '2020-01-01T00:00:00Z' },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '6. Enquiry create with pre-populated adminRemarks is denied',
    collection: 'enquiries',
    operation: 'create',
    payload: { adminRemarks: 'Auto-approved' },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '7. Admin email with email_verified=false is denied',
    collection: 'siteSettings',
    operation: 'update',
    auth: { uid: 'spoof', email: 'mrfffmaaz@gmail.com', email_verified: false },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '8. Self-assigned admin privilege escalation in staffAccounts is denied',
    collection: 'staffAccounts',
    operation: 'create',
    auth: { uid: 'attacker', email: 'attacker@gmail.com', email_verified: true },
    payload: { email: 'attacker@gmail.com', role: 'admin', isActive: true },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '9. Non-admin updating service charge is denied',
    collection: 'services',
    operation: 'update',
    auth: { uid: 'user', email: 'user@gmail.com', email_verified: true },
    payload: { charge: '₹0' },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '10. Path variable ID poisoning (>128 chars or invalid chars) is denied',
    collection: 'services',
    operation: 'create',
    docId: 'bad id with spaces and /',
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '11. Oversized enquiry message (>600 chars) is denied',
    collection: 'enquiries',
    operation: 'create',
    payload: { message: 'x'.repeat(601) },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '12. Staff deleting an enquiry or mutating immutable source field is denied',
    collection: 'enquiries',
    operation: 'delete',
    auth: { uid: 'staff-1', email: 'staff@ltscp.in', email_verified: true },
    expected: 'PERMISSION_DENIED',
  },
];
