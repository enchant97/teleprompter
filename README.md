# Teleprompter
Teleprompter is a customisable web app allowing users to read off their script.

> Currently a WIP, use at your own risk

## Features
- Customisable prompter view
- Keyboard shortcuts
- Remote control from another device
    - By shareable QR Code
- Save/Load from file functionality

## Deployment
- Ensure you have https via a reverse proxy, otherwise certain features will be disabled
- You have provided the `REDIS_URI` environment variable to working redis server
- If you expect a large number of clients to be connected you will want:
    - Multiple server instances for load-balancing
    - HTTP/2.0 or HTTP/3.0 reverse proxy

## Developer Notes
- Although written using Bun, production builds currently must use "node-server". This is due to Server Side Events not working correctly

## Incomplete Features
- Proper API validation
- Error handling
- synchronisation of multiple prompters
- Complete remote control functionality

## License
This project is Copyright (c) 2023 Leo Spratt, licences shown below:

Code

    AGPL-3.0. Full license found in `LICENSE.txt`
