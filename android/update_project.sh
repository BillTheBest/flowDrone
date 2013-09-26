#!/bin/bash
#
# 1) install android-sdk + api revisions ..
#    (prepare 64bit Ubuntu by: sudo apt-get install ia32-libs )
# 2) create at least one AVD
# 3) modify your .bashrc, add (right path): 
#    PATH=$PATH:/opt/android-sdk-linux/tools/:/opt/android-sdk-linux/platform-tools && export PATH
# 4) login / logout
# 5) run this file
# 6) run: ant debug
# 7) start an android emulator
# 8) run in an extra terminal: adb logcat
# 9) run: ant installd
#

which android >/dev/null || {
    echo "ERROR: android command (android-sdk/tools/android) is not in the PATH."
    exit 1
}

android update project --path `pwd` --target "Google Inc.:Google APIs:15" --name BMWi

#eof
