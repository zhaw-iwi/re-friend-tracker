FROM gitpod/workspace-full:latest

ENV NG_CLI_ANALYTICS=false

RUN bash -c ". .nvm/nvm.sh     && nvm install 18.12.1     && nvm use 18.12.1     && nvm alias default 18.12.1"

RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix
