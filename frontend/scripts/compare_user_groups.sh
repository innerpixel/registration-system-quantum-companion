#!/bin/bash

# Compare regular_000X and wave_001_00X users
# This script checks if both groups have the same setup and configurations

check_user() {
    local username=$1
    local home_dir="/home/$username"
    echo "Checking user: $username"
    echo "----------------------------------------"
    
    # Check user existence
    if id "$username" &>/dev/null; then
        echo "✅ User exists"
    else
        echo "❌ User does not exist"
        return
    fi
    
    # Check home directory
    if [ -d "$home_dir" ]; then
        echo "✅ Home directory exists"
    else
        echo "❌ Home directory missing"
        return
    fi
    
    # Check Maildir structure
    local maildir_folders=("cur" "new" "tmp" ".Sent" ".Drafts" ".Trash")
    local maildir_ok=true
    
    for folder in "${maildir_folders[@]}"; do
        if [ ! -d "$home_dir/Maildir/$folder" ]; then
            echo "❌ Missing Maildir folder: $folder"
            maildir_ok=false
        fi
    done
    
    if [ "$maildir_ok" = true ]; then
        echo "✅ Maildir structure complete"
    fi
    
    # Check neomutt config
    if [ -f "$home_dir/.config/neomutt/neomuttrc" ]; then
        echo "✅ Neomutt config exists"
        
        # Check quantum headers
        local headers=("X-Quantum-Role" "X-Quantum-State" "X-Timeline-Branch" "X-Reality-Index" "X-Cosmic-Mood" "X-Achievement-Count" "X-Quantum-Command-Set")
        local headers_ok=true
        
        for header in "${headers[@]}"; do
            if ! grep -q "$header:" "$home_dir/.config/neomutt/neomuttrc"; then
                echo "❌ Missing header: $header"
                headers_ok=false
            fi
        done
        
        if [ "$headers_ok" = true ]; then
            echo "✅ All quantum headers present"
        fi
    else
        echo "❌ Neomutt config missing"
    fi
    
    # Check quantum signature
    if [ -f "$home_dir/.signature-quantum" ]; then
        echo "✅ Quantum signature exists"
    else
        echo "❌ Quantum signature missing"
    fi
    
    # Check public_html
    if [ -d "$home_dir/public_html" ]; then
        echo "✅ Public HTML directory exists"
    else
        echo "❌ Public HTML directory missing"
    fi
    
    # Check permissions
    if [ "$(stat -c %a $home_dir/Maildir)" = "700" ]; then
        echo "✅ Maildir permissions correct"
    else
        echo "❌ Incorrect Maildir permissions"
    fi
    
    if [ "$(stat -c %a $home_dir/public_html)" = "755" ]; then
        echo "✅ Public HTML permissions correct"
    else
        echo "❌ Incorrect public_html permissions"
    fi
    
    if [ -f "$home_dir/.config/neomutt/neomuttrc" ] && [ "$(stat -c %a $home_dir/.config/neomutt/neomuttrc)" = "600" ]; then
        echo "✅ Neomutt config permissions correct"
    else
        echo "❌ Incorrect neomutt config permissions"
    fi
    
    echo "----------------------------------------"
}

echo "Comparing regular_000X and wave_001_00X users"
echo "============================================"

echo -e "\nChecking regular_000X users:"
for i in {2..4}; do
    check_user "regular_000$i"
done

echo -e "\nChecking wave_001_00X users:"
for i in {1..4}; do
    id=$(printf "%03d" $i)
    check_user "wave_001_$id"
done

# Compare specific features between groups
echo -e "\nComparing quantum features between groups:"
echo "============================================"

compare_quantum_features() {
    local reg_user=$1
    local wave_user=$2
    
    echo "Comparing $reg_user vs $wave_user"
    echo "----------------------------------------"
    
    local reg_config="/home/$reg_user/.config/neomutt/neomuttrc"
    local wave_config="/home/$wave_user/.config/neomutt/neomuttrc"
    
    if [ -f "$reg_config" ] && [ -f "$wave_config" ]; then
        # Compare roles
        local reg_role=$(grep "X-Quantum-Role:" "$reg_config" | cut -d: -f2-)
        local wave_role=$(grep "X-Quantum-Role:" "$wave_config" | cut -d: -f2-)
        echo "Regular Role: $reg_role"
        echo "Wave Role: $wave_role"
        
        # Compare commands
        local reg_commands=$(grep "X-Quantum-Command-Set:" "$reg_config" | cut -d: -f2-)
        local wave_commands=$(grep "X-Quantum-Command-Set:" "$wave_config" | cut -d: -f2-)
        echo "Regular Commands: $reg_commands"
        echo "Wave Commands: $wave_commands"
        
        # Compare timeline branches
        local reg_timeline=$(grep "X-Timeline-Branch:" "$reg_config" | cut -d: -f2-)
        local wave_timeline=$(grep "X-Timeline-Branch:" "$wave_config" | cut -d: -f2-)
        echo "Regular Timeline: $reg_timeline"
        echo "Wave Timeline: $wave_timeline"
    else
        echo "❌ Cannot compare - one or both config files missing"
    fi
    echo "----------------------------------------"
}

echo -e "\nDetailed quantum feature comparison:"
for i in {2..4}; do
    compare_quantum_features "regular_000$i" "wave_001_00$i"
done
