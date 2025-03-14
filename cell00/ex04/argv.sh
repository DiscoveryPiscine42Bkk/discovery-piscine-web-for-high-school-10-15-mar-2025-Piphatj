#!/bin/bash

# Check if no arguments are supplied
if [ $# -eq 0 ]; then
    echo "No arguments supplied"
    exit 1
fi

# Loop through each argument (folder name)
for folder_name in "$@"; do
    # Create a new folder name by prepending "ex" to the argument
    new_folder="ex$folder_name"
    
    # Check if the folder already exists
    if [ -d "$new_folder" ]; then
        echo "Folder '$new_folder' already exists. Skipping..."
    else
        # Create the new folder
        mkdir "$new_folder"
        echo "Folder created: $new_folder"
    fi
done



