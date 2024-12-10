[JC](/index.html) [Index](/index.html) [Projects](/projects.html) [Trips](/trips.html) [Notes](/notes.html) [Jacob](/about.html)

# Linux Reference

I'm tired of having to web search for stupid simple things that I already know but forgot the command or location of the config file. Why doesn't something like this exist already!?

See Also: [Linux Fix](/projects/linux_fix.html)

## Vim

- Write to file after forgetting to `vim` using `sudo`:
  
  ```
  :w !sudo tee %
  ```

## System Config Files

- Mount disks on boot - `/etc/fstab`
- Docker
  
  - Docker Compose - `~/docker/docker-compose.yml`

## User Config Files

- User created binaries/scripts - `/usr/local/bin`

## Get Info

- Hardware
  
  - CPU - `lscpu`
  - Block Device (storage) - `lsblk`
    
    - Partition UUID - `blkid`
  - Memory - `lsmem`
  - USB Devices - `lsusb`
- Bash History - `~/.bash_history`
