{
  description = "Reproducible Dosage application and Lean verification toolchain";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      supportedSystems = [
        "aarch64-darwin"
        "x86_64-darwin"
        "aarch64-linux"
        "x86_64-linux"
      ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
      expectedLeanVersion = "4.30.0";
      packagesFor =
        system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        if pkgs.lean4.version != expectedLeanVersion then
          throw "Expected Lean ${expectedLeanVersion}, got ${pkgs.lean4.version}"
        else
          pkgs;
    in
    {
      devShells = forAllSystems (
        system:
        let
          pkgs = packagesFor system;
        in
        {
          default = pkgs.mkShell {
            packages = [
              pkgs.git
              pkgs.lean4
              pkgs.nodejs_24
            ];
          };
        }
      );

      checks = forAllSystems (
        system:
        let
          pkgs = packagesFor system;
        in
        {
          formal =
            pkgs.runCommand "dosage-formal-verification"
              {
                nativeBuildInputs = [
                  pkgs.lean4
                  pkgs.stdenv.cc
                ];
                src = self;
              }
              ''
                cp -R "$src" source
                chmod -R u+w source
                export HOME="$TMPDIR"
                cd source/formal/lean
                lake build
                touch "$out"
              '';
        }
      );

      formatter = forAllSystems (system: (packagesFor system).nixfmt);
    };
}
