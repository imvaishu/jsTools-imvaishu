#!/bin/bash

cat <<EOF > .git/hooks/pre-commit
npm run allTests
if [ \$? != 0 ]; then 
 echo "\033[1;31mFix The Test First\033[0m\n"
 exit 1
fi

EOF

chmod +x .git/hooks/pre-commit

cat <<EOF > .git/hooks/pre-push
npm run lint
if [ \$? != 0 ]; then 
echo "\033[1;31mFix The Test First\033[0m\n"
 exit 1
fi

EOF

chmod +x .git/hooks/pre-push