#!/bin/sh
# gradlew مبسّط: يستخدم wrapper الرسمي إن وُجد ملف jar، وإلا يحمّل Gradle المحدد تلقائيًا.
APP_HOME=$(cd "$(dirname "$0")" && pwd -P)
JAR="$APP_HOME/gradle/wrapper/gradle-wrapper.jar"
if [ -f "$JAR" ]; then
  exec java -classpath "$JAR" org.gradle.wrapper.GradleWrapperMain "$@"
fi
VER=$(sed -n 's/.*gradle-\([0-9.]*\)-bin\.zip.*/\1/p' "$APP_HOME/gradle/wrapper/gradle-wrapper.properties" | head -n1)
[ -n "$VER" ] || VER=8.9
BASE="${GRADLE_USER_HOME:-$HOME/.gradle}/bootstrap"
DIST="$BASE/gradle-$VER"
if [ ! -x "$DIST/bin/gradle" ]; then
  mkdir -p "$BASE"
  ZIP="$BASE/gradle-$VER-bin.zip"
  URL="https://services.gradle.org/distributions/gradle-$VER-bin.zip"
  echo "Downloading Gradle $VER ..."
  if command -v curl >/dev/null 2>&1; then curl -fsSL "$URL" -o "$ZIP"; else wget -q "$URL" -O "$ZIP"; fi
  if [ -f "$ZIP" ]; then unzip -q -o "$ZIP" -d "$BASE" && rm -f "$ZIP"; fi
fi
if [ -x "$DIST/bin/gradle" ]; then exec "$DIST/bin/gradle" "$@"; fi
if command -v gradle >/dev/null 2>&1; then exec gradle "$@"; fi
echo "Gradle not available" >&2; exit 1
