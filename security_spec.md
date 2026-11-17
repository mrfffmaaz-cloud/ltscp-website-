# LTSCP Digital Seva & Cyber Cafe — Security Specification (Phase 0)

## 1. Data Invariants
1. **Public Read Scope**: Only `siteSettings`, `categories`, and `services` are publicly readable. Customer PII (`enquiries`), operator records (`staffAccounts`), and traffic telemetry (`analyticsEvents`) must NEVER be publicly readable or listable.
2. **Enquiry Integrity**: Public website visitors may create an `enquiries` document ONLY with `status == 'New'`, `adminRemarks == ''`, `source == 'website_form'`, `createdAt == request.time`, and `updatedAt == request.time`. Visitors cannot read, list, update, or delete any enquiry.
3. **RBAC Enforcement**: Only verified Admin (`mrfffmaaz@gmail.com` with `email_verified == true` or an active `admin` entry in `staffAccounts`) may mutate `siteSettings`, `categories`, `services`, `staffAccounts`, or delete `enquiries`. Active `staff` may read/update `enquiries` status and remarks and view `analyticsEvents`.
4. **Strict Keys & Size Bounds**: Every document write validates `keys().hasAll(...)` and `keys().hasOnly(...)`, type checks, string `.size()` bounds, bounded arrays (`<= 20`), and `isValidId()` on single-document path variables.
5. **Temporal Integrity**: `createdAt` is immutable on update and equals `request.time` on create; `updatedAt == request.time` on create and update.

## 2. The "Dirty Dozen" Payloads (Expected: PERMISSION_DENIED)
1. **Unauthenticated read of `enquiries`**: `get(/enquiries/enq1)` or `list(/enquiries)` without auth.
2. **Non-admin authenticated read of `enquiries`**: Signed-in regular Gmail user not in `staffAccounts`.
3. **Enquiry status spoofing on create**: `create(/enquiries/enq2)` with `status: "Completed"`.
4. **Enquiry shadow field injection**: `create(/enquiries/enq3)` with extra field `isVerified: true`.
5. **Enquiry timestamp forgery**: `create(/enquiries/enq4)` with `createdAt` set to past client Date instead of `request.time`.
6. **Enquiry PII remark injection on create**: `create(/enquiries/enq5)` with non-empty `adminRemarks: "Approved"`.
7. **Unverified email admin spoof**: Auth token has `email: "mrfffmaaz@gmail.com"` with `email_verified: false`.
8. **Privilege escalation on `staffAccounts`**: Non-admin signed-in user trying to `setDoc(/staffAccounts/hacker@gmail.com, { role: "admin", isActive: true })`.
9. **Unauthorized service price tampering**: Non-admin user trying to `updateDoc(/services/pan-card-new-application, { charge: "₹0" })`.
10. **Path ID poisoning**: Creating `/services/` with an ID containing spaces/slashes or > 128 chars.
11. **Oversized string / Denial-of-Wallet payload**: Creating an enquiry with `message` > 600 chars or `customerName` > 100 chars.
12. **Terminal state bypass by non-admin**: Staff member trying to delete an enquiry or change `source`/`createdAt` on an enquiry update.
