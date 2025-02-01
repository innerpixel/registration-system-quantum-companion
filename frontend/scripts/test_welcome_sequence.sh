#!/bin/bash

# Test all states for a test user
EXPLORER_ID="test_0001"

echo "Testing welcome sequence for all states..."
echo "----------------------------------------"

states=("USERNAME_VALIDATED" "USER_CREATED" "SYSTEM_USER_CREATED" "MAIL_CONFIGURED" "VERIFICATION_SENT" "VERIFIED" "FAILED")

for state in "${states[@]}"; do
    echo "Testing state: $state"
    ./quantum_welcome_sequence.sh "$EXPLORER_ID" "$state"
    echo "----------------------------------------"
    sleep 2
done

echo "Welcome sequence test complete!"
