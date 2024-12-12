---
date: 2024-12-12
title: Fixing Linux Problems
params:
    projectstatus: Maintenance
---


Nothin's ever easy. But things tend to be easier than they used to. But they're still pretty hard.

See Also: [Linux Commands and Files](/notes/tips_linux.html)

Most of these assume Debian or similar.

## Thinkpad T530 Issues

### Git - `Permanently added ECDSA host key...`

Fix: in Bash, `ssh-keyscan github.com >> ~/.ssh/known_hosts`

[Source](https://gist.github.com/vikpe/34454d69fe03a9617f2b009cc3ba200b)

### On boot - `Bluetooth firmware failed to load`

- Find exact error message after boot, and find bluetooth device name:
  
  ```
  sudo dmesg | grep -i bluetooth
lsusb
  ```
- Likely returns something like
  
  ```
  [    3.557646] Bluetooth: hci0: BCM20702A1 (001.002.014) build 0000
[    3.557695] bluetooth hci0: firmware: failed to load brcm/BCM20702A1-0a5c-21e6.hcd (-2)
[    3.557697] bluetooth hci0: Direct firmware load for brcm/BCM20702A1-0a5c-21e6.hcd failed with error -2
[    3.557699] Bluetooth: hci0: BCM: Patch brcm/BCM20702A1-0a5c-21e6.hcd not found
...
Bus 003 Device 003: ID 0a5c:21e6 Broadcom Corp. BCM20702 Bluetooth 4.0 [ThinkPad]
  ```
- Download Bluetooth driver for Windows 7 from [Lenovo Site](https://pcsupport.lenovo.com/us/en/products/laptops-and-netbooks/thinkpad-t-series-laptops/thinkpad-t530/downloads/driver-list/component?name=Bluetooth%20and%20Modem)
- Install `innoextract`, then extract the exe:
  
  ```
  sudo apt install innoextract
cd Downloads
innoextract g4wb12ww.exe
  ```
- (Find name of hex file by looking in `app/Win64/bcbtums-win7x64-bcrm.inf`)
- `cat app/Win64/bcbtums-win7x64-bcrm.inf | grep "0A5C" | grep "21E6"`
- Returns something like `%BRCM20702Thinkpad.DeviceDesc%=RAMUSB21E6, USB\VID_0A5C&PID_21E6 ; 20702 non-UHE Lenovo Japan`. Search again in the inf file for `RAMUSB21E6`. Find .hex file. In my case it is `BCM20702A1_001.002.014.0449.0462.hex`. We will use `hex2hcd` to get a hcd file.
- ```
  cp app/Win64/BCM20702A1_001.002.014.0449.0462.hex ~/Downloads
git clone git://github.com/jessesung/hex2hcd.git
cd hex2hcd
make
  ```
- Convert to hcd (use missing firmware filename from beginning) and put in appropriate spot:
  
  ```
  ./hex2hcd ../BCM20702A1_001.002.014.0449.0462.hex BCM20702A1-0a5c-21e6.hcd
  ```
- Do whatever you need to get it to `/lib/firmware/brcm/` on target machine.
- Done. Source: [Kali Forums](https://forums.kali.org/showthread.php?37121-TUTORIAL-install-Broadcom-bluetooth-on-Lenovo-ThinkPad-X1-Carbon-1-gen)

## Thinkpad T580 Issues

AKA P52s

### `Possible missing firmware` etc. etc. (i915)

- Try installing `apt-file`. (Add `non-free` if necessary.)
- `apt-file search bxt_guc` or a distinct part of missing firmware path.
- Then `apt install firmware-misc-nonfree`. (Only step necessary?)

### Allow touchpad input while keyboard pressed

Note: KDE setting seems to actually work on Debian 11 as of 2022-09-26.

- `xinput list`
- Find touchpad item. T580 is `Synaptics TM3276-031`
- `xinput list-props $DEVICE_ID`
- Find disable while typing enabled (`299`?)
- Unable to change the default for some reason? BadAccess
- `xinput set-prop 12 299 0`

### Firefox uses GNOME file save/open dialogs.

??? No solution. Should use KDE style dialogs

### Firefox doesn't respect system defaults when opening downloaded files

??? No solution. It tries to open PDFs by "installing" them with WINE??????

### System resumes immediately after suspend.

Some kind of ACPI event is waking it up.

- Look for `ACPI: EC: event blocked` somewhere in `dmesg`
- `grep enabled /proc/acpi/wakeup | cut -f 1` (or `cat /proc/acpi/wakeup`)
- Compare codes with `lspci` output to figure out what stuff is.
- Disable USB wakeup? Didn't figure it out.

### Disable FnLock Light

Invert it in BIOS.

### Disable NumLock Light

Note: Not persistent after reboot.

`setxkbmap -option numpad:mac us`

### Display Tearing

Create or edit file `/etc/X11/xorg.conf.d/20-intel-conf`

```
Section "Device"
  Identifier  "Intel Graphics"
  Driver      "intel"
  Option      "TearFree" "true"
EndSection
```

"Press X to not die"

### Fan comes on and off constantly.

I've mostly just come to deal with this...

- [ThinkFan on GitHub](https://github.com/vmatare/thinkfan)
- [Gentoo Wiki ThinkFan Page](https://wiki.gentoo.org/wiki/Fan_speed_control/thinkfan)
- [TPFanControl](https://github.com/stenri/TPFanControl) is recommended by a few.
- [Stack Overflow - Issues](https://askubuntu.com/questions/1219876/hand-control-to-thinkfan)
- Try changing in BIOS - Config - Thunderbolt - Thunderbolt BIOS Assist Mode to Enabled (Recommended by [Arrfab Blog](https://arrfab.net/posts/2019/Oct/29/fixing-heatfan-issue-on-thinkpad-t490s-running-centos-8stream/)

### Python Headaches

Remove Python 2 and everything related. Remove `python-is-python2`. Install `python-is-python3`.

## Debian Install

### Install Recommend

From an HN user: "Personally, I use the non-free netinst CD. When I get to tasksel I only check "Standard system utilites". After rebooting (into a system without even X) I install, wifi and GPU drivers, microcode, "kde-plasma-desktop" and "plasma-nm". This way, I get a very minimal and lean KDE desktop, and after rebooting I install other programs as I see fit."

### For Bare Minimum Install Headaches

If "Install system utilites" fails or you just want to start from as little as possible.

- Use Ethernet. After connecting you may need to refresh DHCP client.
- Use `apt` to install some necessary tools and bootstrap from there.
- If there are no certificates for `apt`, uncomment the cd install line from `/etc/apt/sources.list`, then update and install some stuff like ssh from there first.

## NUC Setup

- You can disable the LEDs in BIOS.
