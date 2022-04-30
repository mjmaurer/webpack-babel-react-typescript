with import <nixpkgs> { };

stdenv.mkDerivation {
  name = "node";
  buildInputs = [ nodejs-14_x nodePackages.npm-check-updates nodePackages.serve yarn ];
}
