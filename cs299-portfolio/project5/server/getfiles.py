import os

def get_all_file_names(directory):
    try:
        # List to store file names
        file_names = []
        
        # Walk through directory
        for root, dirs, files in os.walk(directory):
            for file in files:
                file_names.append(file)
        
        return file_names
    except Exception as e:
        print(f"An error occurred: {e}")
        return []

def rename_files(directory):
    try:
        file_names = get_all_file_names(directory)
        renamed_files = []
        count = 1
        
        for file_name in file_names:
            old_path = os.path.join(directory, file_name)
            # Create new file name like img1, img2, img3, etc.
            new_file_name = f"img{count}{os.path.splitext(file_name)[1]}"
            new_path = os.path.join(directory, new_file_name)
            
            os.rename(old_path, new_path)
            renamed_files.append(new_file_name)
            count += 1
        
        return renamed_files
    except Exception as e:
        print(f"An error occurred: {e}")
        return []

# Directory path
directory = r"C:\Users\lilim\ALL FILES\CODE\-eh111\cs299-portfolio\project5\assets\img\Archives_Gallery_Website"

# Rename files and get renamed file names
renamed_files = rename_files(directory)

# Print renamed file names
print(renamed_files)
