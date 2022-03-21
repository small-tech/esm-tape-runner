# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2022-03-21

### Changed

  - Now passes environment variables and any Node flags to the Node process. Useful for testing applications that use a custom module loader. Not really a breaking change but different enough behaviour that I’m releasing it with a major semver version.

## [1.0.3] - 2021-03-04

### Fixed

  - Now emits a TAP bail-out event, displays the error message, and exits on errors (not test failures).

## [1.0.2] - 2021-03-03

What an odd character.

### Fixed

  - Replaced odd character in readme.

## [1.0.1] - 2021-03-03

A rose by any other name would not compile as sweet.

### Fixed

  - Typo in the binary name.

## [1.0.0] - 2021-03-03

Initial release.
