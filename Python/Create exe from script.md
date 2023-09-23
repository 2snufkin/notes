# Using auto-py-to-exe

`auto-py-to-exe` is a graphical user interface that helps you convert your Python scripts into standalone executable files. This tool simplifies the process of bundling your script along with its dependencies into a single executable.

## Installation

1. **Install Python:** If you don't have Python installed on your computer, you'll need to install it. You can download Python from the official website: [Python Downloads](https://www.python.org/downloads/).

2. **Install `auto-py-to-exe`:** Open a terminal or command prompt and run the following command to install `auto-py-to-exe` using `pip`:

    ```bash
    pip install auto-py-to-exe
    ```
### Errors
 'auto-py-to-exe' is not recognized as an internal or external command
The error you're encountering during the installation of the `auto-py-to-exe` package appears to be related to a problem with the package dependencies and the generation of script launchers. Specifically, the error message mentions an issue with finding the resource `t64.exe` in the package `pip._vendor.distlib`. This error is likely a result of a corruption or misconfiguration in your Python environment or the package itself.

Here are some steps you can take to resolve this issue:

1. **Update pip and setuptools**: First, make sure you have the latest version of `pip` and `setuptools` installed in your virtual environment. You can do this by running the following commands:

   ```
   pip install --upgrade pip setuptools
   ```

2. **Clear the pip cache**: Sometimes, issues like this can be caused by a corrupted pip cache. You can try clearing the cache by running:

   ```
   pip cache purge
   ```

3. **Reinstall the problematic package**: Try reinstalling the `auto-py-to-exe` package after clearing the cache:

   ```
   pip install auto-py-to-exe --force-reinstall
   ```

4. **Check Python version compatibility**: Ensure that you are using a compatible version of Python with `auto-py-to-exe`. Check the documentation or package description for any specific Python version requirements.

5. **Check for system-specific issues**: Occasionally, system-specific issues like antivirus software or file permission problems can interfere with package installations. Ensure that your antivirus isn't blocking any installation processes and that you have the necessary permissions.

6. **Use a different Python environment**: If the issue persists, you might consider creating a fresh virtual environment and attempting the installation there to isolate any potential conflicts in your current environment.

7. **Check for network or proxy issues**: Sometimes, network issues or proxy configurations can interfere with package downloads. Make sure you have a stable internet connection and that your proxy settings (if applicable) are correctly configured.

8. **Seek help from the package maintainers**: If none of the above steps resolve the issue, it's possible that there may be an issue with the `auto-py-to-exe` package itself. In this case, you might want to check the package's issue tracker or seek assistance from its maintainers or community.

By following these steps, you should be able to troubleshoot and resolve the installation issue you're experiencing with `auto-py-to-exe`.
## Using `auto-py-to-exe`

1. **Launch the Tool:** Open a terminal or command prompt and run the following command to launch the `auto-py-to-exe` interface:

    ```bash
    auto-py-to-exe
    ```

2. **Configure Settings:**

    - **Script Location:** Click the "Browse" button to select the Python script you want to convert to an executable.

    - **Additional Files:** If your script uses additional files (like data files or resources), you can add them here.

    - **Main Script Inclusion:** Choose how you want the script to be included. By default, it's set to "One File," which bundles everything into a single executable.

    - **Other Options:** Explore other settings like icon customization and output directory.

3. **Convert Script:**

    - After configuring the settings, click the "Convert .py to .exe" button to start the conversion process.

4. **Generated Executable:**

    - Once the conversion process is complete, you'll find the generated executable in the output directory you specified.

5. **Test the Executable:**

    - Run the generated executable to make sure it works as expected.

## Benefits of `auto-py-to-exe`

- **Simplified Process:** `auto-py-to-exe` provides an intuitive interface to bundle your script and dependencies into an executable without requiring in-depth knowledge of packaging.

- **Customization:** You can customize various settings like inclusion of additional files, icons, and more.

- **One-Click Conversion:** With a few clicks, you can convert your Python script into a standalone executable ready for distribution.

 
