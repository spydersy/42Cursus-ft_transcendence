curl -F grant_type=authorization_code \
-F client_id=b645a2e7e9c3b0cc8345619af067b26396718e9a1d172c3f36fc602f6ce3cb20 \
-F client_secret=886ccd72a131ea74ab5cce6622c1502742181d0382ab4136633d7fc56fa46b95 \
-F code=18f79ae947926417cea94b69b232df043e6cc4072a2b6fcc28bd0895cfe6c1c5 \
-F redirect_uri=http://localhost:3000/auth \
-X POST https://api.intra.42.fr/oauth/token
