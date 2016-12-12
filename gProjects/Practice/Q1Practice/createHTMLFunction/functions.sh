new-web-project(){
  printf "%s\n" "Building a new web project"
  mkdir $1
  pushd $1
  touch index.html
  cd ..
  mkdir css
  pushd css
  touch style.css
  popd

}
