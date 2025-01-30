#!/bin/bash

# Create Wave 001 Space Explorers
# This script creates a new wave of quantum-ready users

# Configuration
BASE_DIR="/home"
WAVE_PREFIX="wave_001"
START_ID=001
END_ID=004

# Role definitions
declare -A ROLES=(
    ["001"]="First Contact Specialist|Alpha-Γ|Earth-001|🌟|/translate-quantum,/quantum-chess,/temporal-snapshot"
    ["002"]="Quantum Communications Expert|Beta-Δ|Earth-002|🌈|/forge-reality,/quantum-chess,/temporal-snapshot"
    ["003"]="Space-Time Navigator|Gamma-Ω|Earth-003|🌑|/inspect-timeline,/temporal-snapshot,/reality-fork"
    ["004"]="Cosmic Data Analyst|Delta-Φ|Earth-004|💫|/weave-data,/entropy-joke,/quantum-chess"
)

create_user() {
    local id=$1
    local username="${WAVE_PREFIX}_${id}"
    local home_dir="${BASE_DIR}/${username}"
    
    echo "Creating user: $username"
    
    # Create Linux user
    sudo useradd -m -s /bin/bash "$username"
    echo "${username}:quantum${id}" | sudo chpasswd
    
    # Create mail directories
    sudo -u "$username" mkdir -p "${home_dir}/Maildir"/{cur,new,tmp}
    sudo -u "$username" mkdir -p "${home_dir}/Maildir/.Sent"/{cur,new,tmp}
    sudo -u "$username" mkdir -p "${home_dir}/Maildir/.Drafts"/{cur,new,tmp}
    sudo -u "$username" mkdir -p "${home_dir}/Maildir/.Trash"/{cur,new,tmp}
    sudo chmod -R 700 "${home_dir}/Maildir"
    
    # Create neomutt config directory
    sudo -u "$username" mkdir -p "${home_dir}/.config/neomutt"
    
    # Get role information
    IFS='|' read -r role timeline reality mood commands <<< "${ROLES[$id]}"
    
    # Create neomutt configuration
    sudo tee "${home_dir}/.config/neomutt/neomuttrc" << EOF
# Maildir settings
set mbox_type=Maildir
set folder="~/Maildir"
set spoolfile="+/"
set record="+.Sent"
set postponed="+.Drafts"
set trash="+.Trash"

# Create new directories for received mail
set mask="!^\.[^.]"
set mbox="~/Maildir"

# Identity settings
set realname="Space Explorer ${username} (${role})"
set from="${username}@ld-csmlmail.test"

# Local SMTP settings for development
set smtp_url="smtp://localhost:25"
set ssl_starttls=no
set ssl_force_tls=no
set ssl_verify_dates=no
set ssl_verify_host=no

# Basic display settings
set sort=threads
set sort_aux=reverse-last-date-received
set date_format="%Y-%m-%d %H:%M"

# Character set
set send_charset="utf-8"
set assumed_charset="utf-8"

# Allow special characters in headers
set allow_8bit=yes

# Custom headers
my_hdr Organization: CSMCL Space Wave 001 Division
my_hdr X-Space-Frequency: CSMC${id}
my_hdr X-Quantum-Role: ${role}
my_hdr X-Quantum-State: Superpositioned
my_hdr X-Timeline-Branch: ${timeline}
my_hdr X-Reality-Index: ${reality}
my_hdr X-Cosmic-Mood: ${mood}
my_hdr X-Achievement-Count: 0
my_hdr X-Quantum-Command-Set: ${commands}

# Quantum signature
set signature="~/.signature-quantum"
EOF
    
    # Create quantum signature
    sudo tee "${home_dir}/.signature-quantum" << EOF
--
${role}
Wave: 001
Timeline: ${timeline}
Reality: ${reality}

"The quantum realm awaits your exploration"
EOF
    
    # Set permissions
    sudo chown -R "${username}:${username}" "${home_dir}/.config"
    sudo chmod 700 "${home_dir}/.config/neomutt"
    sudo chmod 600 "${home_dir}/.config/neomutt/neomuttrc"
    sudo chmod 600 "${home_dir}/.signature-quantum"
    
    # Create public directory
    sudo -u "$username" mkdir -p "${home_dir}/public_html"
    sudo chmod 755 "${home_dir}/public_html"
    
    echo "✅ User $username created successfully"
}

echo "Creating Wave 001 Space Explorers..."
echo "===================================="

# Create each user
for id in $(seq -f "%03g" $START_ID $END_ID); do
    create_user "$id"
    echo "------------------------------------"
done

echo "Wave 001 creation complete!"
echo "Running welcome sequence for all users..."

# Send welcome messages using our quantum welcome sequence
for id in $(seq -f "%03g" $START_ID $END_ID); do
    username="${WAVE_PREFIX}_${id}"
    ../scripts/quantum_welcome_sequence.sh "$username" "VERIFIED"
done

echo "All done! Wave 001 is ready for quantum exploration!"
