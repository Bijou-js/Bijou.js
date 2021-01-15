npm i -g showdown terser prettier figlet-cli
function commit {
  COMMIT=$(git status --porcelain)
  if [[ ${#COMMIT} -ge 1 ]] ; then
    cd /workspace/bijou.js
    showdown makehtml -i README.md -o README.html
    terser --compress --mangle -o bijou-min.js -- bijou.js
    COMMIT_FILE=$(git diff --name-only)
    git stage .
    DATE=$(date +"%F %H:%M:%S")
    USER=$(git config user.name)
    EMAIL=$(git config user.email)
    REPO="BIJOU.JS"
    FIGLET_REPO=$(figlet -kf Big -- $REPO)
    BR=$'\n'
    COMMIT_MSG=$"${FIGLET_REPO}${BR}Files changed: ${BR}${BR}${COMMIT}${BR}${BR}Date: ${DATE}${BR}User: ${USER}${BR}Email: ${EMAIL}"
    git commit -m "${COMMIT_FILE}" -m "${COMMIT_MSG}"
    git push
  fi
}
function beautify {
  cd /workspace/bijou.js
  showdown makehtml -i README.md -o README.html
  terser --compress --mangle -o bijou-min.js -- bijou.js
  prettier --quote-props=consistent --trailing-comma=all --no-semi --write -- /workspace/
  commit
}
function release {
  OWNER="Explosion-Scratch"
  REPOSITORY="bijou.js"
  read -sp "Enter access token:  " ACCESS_TOKEN
  echo
  read -p "Version:  " VERSION
  echo
  npm version "${VERSION}"
  npm publish
  curl --data '{"tag_name": "v${VERSION}",
                  "target_commitish": "master",
                  "name": "v${VERSION}",
                  "body": "Release of version ${VERSION}",
                  "draft": false,
                  "prerelease": false}' \
      https://api.github.com/repos/$OWNER/$REPOSITORY/releases?access_token=$ACCESS_TOKEN
}