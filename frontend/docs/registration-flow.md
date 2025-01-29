# Cosmic User Registration System Flow

## User Data Structure

### Registration Input Fields
1. **Personal Contact Email**
   - Purpose: Verification and emergency contact
   - Example: `user.personal@hotmail.com`
   - Requirements:
     - Must be valid email format
     - Must be unique in system
     - Used for sending verification link

2. **Cosmical Display Name**
   - Purpose: Public identifier/designation
   - Example: `Cosmic Explorer Alpha`
   - Requirements:
     - Minimum 3 characters
     - Can contain spaces and special characters
     - Must be unique

3. **System Username**
   - Purpose: Linux system account and email prefix
   - Example: `explorer_alpha`
   - Requirements:
     - Must follow Linux username conventions
     - 3-16 characters
     - Lowercase letters, numbers, underscore, hyphen
     - Must start with a letter
     - Must be unique
     - Will form system email: `username@local.domain`

4. **Password**
   - Purpose: System authentication
   - Requirements:
     - Minimum 8 characters
     - Must contain mix of characters
     - Stored with bcrypt hashing

5. **SIM Emergency Frequency**
   - Purpose: Future emergency protocols
   - Example: `CSMC123`
   - Requirements:
     - Must be unique
     - Format validation (TBD)

## Validation Process

```javascript
async function validateRegistration(data) {
    // 1. Username Validations
    const systemUserExists = await checkSystemUser(data.username);
    const emailExists = await checkEmail(`${data.username}@local.domain`);
    const isValidUsername = /^[a-z][a-z0-9_-]{2,15}$/.test(data.username);

    // 2. Personal Email Validation
    const personalEmailExists = await checkPersonalEmail(data.personalEmail);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalEmail);

    // 3. Display Name Validation
    const displayNameExists = await checkDisplayName(data.displayName);
    const isValidDisplayName = data.displayName.length >= 3;

    // 4. SIM Frequency Validation
    const simFrequencyExists = await checkSimFrequency(data.simFrequency);
    const isValidSimFrequency = /^CSMC\d{3}$/.test(data.simFrequency);

    // All validations must pass
    return {
        isValid: !systemUserExists && 
                !emailExists && 
                !personalEmailExists && 
                !displayNameExists &&
                !simFrequencyExists &&
                isValidUsername &&
                isValidEmail &&
                isValidDisplayName &&
                isValidSimFrequency,
        errors: {
            username: systemUserExists ? 'Username already taken' : null,
            email: emailExists ? 'Email already registered' : null,
            personalEmail: personalEmailExists ? 'Personal email already registered' : null,
            displayName: displayNameExists ? 'Display name already taken' : null,
            simFrequency: simFrequencyExists ? 'SIM frequency already assigned' : null
        }
    };
}
```

## Database Schema

```javascript
const UserSchema = {
    // System Identifiers
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^[a-z][a-z0-9_-]{2,15}$/
    },
    
    // Public Profile
    displayName: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    
    // Email Addresses
    systemEmail: {
        type: String,
        required: true,
        unique: true,
        // Generated from username@local.domain
    },
    personalEmail: {
        type: String,
        required: true,
        unique: true,
        // Their external contact email
    },
    
    // Authentication
    password: {
        type: String,
        required: true
        // Stored with bcrypt
    },
    
    // Emergency Info
    simFrequency: {
        type: String,
        required: true,
        unique: true,
        match: /^CSMC\d{3}$/
    },
    
    // Status Flags
    isVerified: {
        type: Boolean,
        default: false
    },
    systemUserCreated: {
        type: Boolean,
        default: false
    },
    
    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    verifiedAt: Date,
    lastLoginAt: Date
}
```

## Registration Flow

1. **Frontend Validation**
   ```javascript
   // Initial client-side validation
   validateForm(formData) {
       // Username format
       // Email format
       // Password strength
       // Required fields
   }
   ```

2. **Backend Registration Process**
   ```javascript
   async function registerUser(data) {
       // Start transaction
       const session = await mongoose.startSession();
       session.startTransaction();
       
       try {
           // 1. Validate all inputs
           const validation = await validateRegistration(data);
           if (!validation.isValid) {
               throw new ValidationError(validation.errors);
           }
           
           // 2. Create user in MongoDB
           const user = await User.create({
               username: data.username,
               displayName: data.displayName,
               systemEmail: `${data.username}@local.domain`,
               personalEmail: data.personalEmail,
               password: await bcrypt.hash(data.password, 10),
               simFrequency: data.simFrequency
           });
           
           // 3. Create Linux system user
           await createSystemUser({
               username: data.username,
               email: `${data.username}@local.domain`
           });
           
           // 4. Update user record
           user.systemUserCreated = true;
           await user.save();
           
           // 5. Generate verification token
           const verificationToken = generateToken(user);
           
           // 6. Send verification email
           await sendVerificationEmail({
               to: data.personalEmail,
               token: verificationToken,
               username: data.username,
               displayName: data.displayName
           });
           
           // Commit transaction
           await session.commitTransaction();
           
           return {
               success: true,
               user: {
                   username: user.username,
                   displayName: user.displayName,
                   systemEmail: user.systemEmail
               }
           };
           
       } catch (error) {
           // Rollback on any error
           await session.abortTransaction();
           
           // Clean up system user if created
           if (error.systemUserCreated) {
               await removeSystemUser(data.username);
           }
           
           throw error;
       }
   }
   ```

3. **Email Verification Process**
   ```javascript
   async function verifyEmail(token) {
       // 1. Validate token
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
       // 2. Update user verification status
       const user = await User.findByIdAndUpdate(
           decoded.userId,
           {
               isVerified: true,
               verifiedAt: new Date()
           },
           { new: true }
       );
       
       // 3. Send welcome email
       await sendWelcomeEmail({
           to: user.systemEmail,
           displayName: user.displayName
       });
       
       return user;
   }
   ```

## Error Handling

1. **Validation Errors**
   - Invalid username format
   - Duplicate entries
   - Invalid email format
   - Weak password

2. **System Errors**
   - Linux user creation failure
   - Email sending failure
   - Database transaction failure

3. **Recovery Procedures**
   - Transaction rollback
   - System user cleanup
   - Error logging
   - User notification

## Security Considerations

1. **Password Security**
   - Bcrypt hashing
   - Minimum strength requirements
   - No plaintext storage

2. **Email Security**
   - Verification required
   - Secure token generation
   - Limited token validity

3. **System Security**
   - Proper Linux permissions
   - Secure mail directory setup
   - Protected user home directories
