# Change Case

[![Build Status](https://api.travis-ci.org/pranshuagrawal/vscode-toggle-case.svg?branch=master)](https://travis-ci.org/github/pranshuagrawal/vscode-toggle-case)

Since changing the case is a frequent requirement during development and general writing, there needs to a better way to do this. This [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=PranshuAgrawal.toggle-case) provides a faster, easy to remember and user friendly ways to change case of the selected text. 

You can use `Keyboard Shortcut`, `MacOS Touchbar` or `VS Code Command Palette` to change the case.

This extension supports multiple ways to change the case and it works on both single and multi cursors.

# Usage

- Press the defined keybord shortcut to toggle through various cases. And dont worry you will never loose your original text since that is also included in the cycle.
    - Cmd + M on MacOS
    - Ctrl + M on Windows

  ![Working](https://i.imgur.com/CM1YAug.gif)

- This works with multi lines selection as well

  ![Working](https://i.imgur.com/YK6grm9.gif)

- Or if you want to change text to a particular format, you can select the text (multiple selection works too) and open Command Pallette (defaults to Cmd + Shift + P in MacOS) and start typing `Change case to ` and select the required case.

  ![Working](https://i.imgur.com/1Z5mgle.gif)

- Or if you are using a mac with a touch bar, the moment you select some text on the VS Code editor, a button will popup on your touchbar. You can press this to toggle through multiple cases. 

  ![Working](https://i.imgur.com/Vbcab6P.png)


# Case Supported

You can toggle through multiple cases, you can find the complete list below:
  - UPPERCASE
  - lowercase
  - Title Case
  - camelCase
  - CONSTANT_CASE
  - dot.case
  - Header-Case
  - param-case
  - PascalCase
  - path/case
  - Sentence case
  - snake_case

This extenion is using some functions of [change-case](https://github.com/blakeembrey/change-case).

# Settings

The extension supports the following setting. Navigate to Preferences > Setting > Toggle Case
 - You can enable/disable any case from being the part of the loop.
 - You can turn notification on/off showing the case text is transformed to.

# Installation
Launch VS Code Quick Open (Ctrl/Cmd+P), paste the following command, and press enter.
```sh
ext install toggle-case
```

Or you can use this [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=PranshuAgrawal.toggle-case) link of the extension to download it directly to VS Code.

# Support

[Log a issue](https://github.com/pranshuagrawal/vscode-toggle-case/issues) or reach out to me at <me@pranshu.works>