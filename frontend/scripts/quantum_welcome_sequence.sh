#!/bin/bash

# Quantum Welcome Sequence - Aligned with Registration Flow
# This script sends welcome messages based on registration state transitions

EXPLORER_ID=$1
EXPLORER_EMAIL="regular_${EXPLORER_ID}@ld-csmlmail.test"
STATE=$2

function send_message() {
    local recipient=$1
    local subject=$2
    local content=$3
    echo "$content" | mail -s "$subject" "$recipient"
}

case $STATE in
    "USERNAME_VALIDATED")
        # First Contact Message
        send_message "$EXPLORER_EMAIL" "🌟 Quantum Signature Detected!" "
=================================
🎯 QUANTUM SIGNATURE DETECTED
=================================

Greetings, Future Explorer!

Your unique quantum signature has been detected in the 
space-time continuum! We're preparing your quantum 
communications array...

Current Status:
- Quantum ID: Validated
- Reality Index: Initializing
- Space-Time Coordinates: Calculating

Stand by for further instructions...
================================="
        ;;

    "USER_CREATED")
        # Profile Creation Confirmation
        send_message "$EXPLORER_EMAIL" "🎨 Your Quantum Profile is Taking Shape!" "
=================================
🎨 QUANTUM PROFILE INITIALIZED
=================================

Excellent progress, Explorer!

Your quantum profile is forming in the space-time 
continuum. We're currently:

🔧 Configuring Your Tools:
- Quantum Communication Array
- Reality Manipulation Interface
- Space-Time Coordinate System

🎮 Achievement Unlocked: 'Reality Anchor'
Points: +10
'Your first step into quantum existence!'

Next Step: System calibration in progress...
================================="
        ;;

    "SYSTEM_USER_CREATED")
        # System Welcome
        send_message "$EXPLORER_EMAIL" "🚀 Your Quantum Systems Are Online!" "
=================================
🚀 SYSTEMS ONLINE
=================================

Welcome aboard, Space Explorer!

Your quantum systems are now operational:

📡 Available Systems:
- Quantum Mail (/quantum-mail)
- Reality Viewer (/view-reality)
- Space-Time Chat (/space-chat)

🎮 Achievement Unlocked: 'System Initializer'
Points: +15
'You've brought your systems online!'

Next: Watch for your verification beacon...
================================="
        ;;

    "MAIL_CONFIGURED")
        # Communication System Ready
        send_message "$EXPLORER_EMAIL" "📡 Quantum Communications Ready!" "
=================================
📡 QUANTUM COMMS ACTIVE
=================================

Excellent news, Explorer!

Your quantum communication systems are fully operational!

Try these starter commands:
/greet - Send your first quantum greeting
/joke - Share a cosmic joke
/high-five - Quantum high-five!

🎮 Achievement Unlocked: 'Communications Expert'
Points: +20
'Your first quantum communication channel!'

Tip: Start with a simple /greet to test the waters!
================================="
        ;;

    "VERIFICATION_SENT")
        # Verification Process
        send_message "$EXPLORER_EMAIL" "⚡ Verify Your Quantum Signature!" "
=================================
⚡ VERIFICATION REQUIRED
=================================

Almost there, Explorer!

We've sent a quantum verification beacon to your 
personal communication device. To complete your 
initialization:

1. Locate the verification beacon
2. Click the quantum link
3. Watch your reality stabilize!

🎮 Achievement Unlocked: 'Reality Anchor'
Points: +25
'Almost fully quantum-synchronized!'

Important: Verification expires in 24 Earth hours!
================================="
        ;;

    "VERIFIED")
        # Full Access Granted
        send_message "$EXPLORER_EMAIL" "🌌 Welcome to the Quantum Realm!" "
=================================
🌌 FULL QUANTUM ACCESS GRANTED
=================================

Congratulations, Space Explorer!

You are now a fully verified member of our quantum 
reality! Your achievement progress:

🏆 Achievements Unlocked:
- 'Reality Anchor' (10 pts)
- 'System Initializer' (15 pts)
- 'Communications Expert' (20 pts)
- 'Quantum Verified' (50 pts)

Total Points: 95

🎮 Available Commands:
/help - View all commands
/tutorial - Start beginner tutorial
/meet - Meet other explorers
/pet - Get your quantum pet

💫 Next Steps:
1. Complete the tutorial (/tutorial)
2. Meet your fellow explorers (/meet)
3. Name your quantum pet (/pet)

Remember: Every master explorer started as a beginner!

Best of luck on your quantum journey!
================================="
        ;;

    "FAILED")
        # Error Recovery
        send_message "$EXPLORER_EMAIL" "🔧 Quantum Anomaly Detected!" "
=================================
🔧 QUANTUM ANOMALY DETECTED
=================================

Don't worry, Explorer!

We've detected a quantum anomaly in your registration 
process. Our Quantum Engineers are working to 
stabilize your reality.

🚨 What's Happening:
- Reality fluctuation detected
- Automatic recovery initiated
- Support team notified

Please stand by for further instructions.
================================="
        ;;
esac
