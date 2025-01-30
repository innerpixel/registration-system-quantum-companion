#!/bin/bash

# Array of test users
USERS=("cosmic_explorer" "star_voyager" "nebula_seeker")

# Check mail spool for each user
for user in "${USERS[@]}"; do
    echo "Checking mail for $user..."
    
    # Check if user exists
    if id "$user" >/dev/null 2>&1; then
        # Check mail spool
        if [ -f "/var/mail/$user" ]; then
            echo "Mail spool exists for $user"
            echo "Last 5 mail headers:"
            sudo head -n 25 "/var/mail/$user"
        else
            echo "No mail spool found for $user"
        fi
        
        # Check maildir if it exists
        if [ -d "/home/$user/Maildir" ]; then
            echo "Maildir exists for $user"
            echo "Recent messages:"
            ls -la "/home/$user/Maildir/new"
        fi
    else
        echo "User $user does not exist in system"
    fi
    echo "----------------------------------------"
done
