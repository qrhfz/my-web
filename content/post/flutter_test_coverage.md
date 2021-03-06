---
title : "Mendapatkan Test Coverage Sepenuhnya Pada Flutter"
date : "2022-03-23"
author : "Qori El-Hafizh"
cover : "/img/louis-reed-JeInkKlI2Po-unsplash.jpg"
description : "Cara setup build di Netlify untuk flutter web"
---

`flutter test --coverage` akan melakukan pengujian dan membuat laporan. Permasalahannya adalah command tersebut tidak akan melaporkan pengujian file yang tidak dipanggil oleh flutter test. Sehingga, jika anda belum membuat file test nya maka akan luput dari presentase test coverage.

Untuk mengatasi masalah itu, kita dapat menggunakan bash script yang membuat file helper yang mengimport file code pada `lib` sehingga "dikunjungi" oleh Dart VM saat `flutter test --coverage` .

Berikut script-nya
```bash
#!/bin/sh
file=test/coverage_helper_test.dart
printf "// Helper file to make coverage work for all dart files\n" > $file
printf "// **************************************************************************\n" >> $file
printf "// Because of this: https://github.com/flutter/flutter/issues/27997#issue-410722816\n" >> $file
printf "// DO NOT EDIT THIS FILE USE: sh scripts/import_files_coverage.sh YOUR_PACKAGE_NAME\n" >> $file
printf "// **************************************************************************\n" >> $file
printf "\n" >> $file
printf "// ignore_for_file: unused_import\n" >> $file
find lib -type f \( -iname "*.dart" ! -iname "*.g.dart" ! -iname "*.freezed.dart" ! -iname "generated_plugin_registrant.dart" \) | cut -c4- | awk -v package="$1" '{printf "import '\''package:%s%s'\'';\n", package, $1}' >> $file
printf "\nvoid main(){}" >> $file
```

Anda dapat menyimpan script tersebut pada `scripts/import_files_coverage.sh` . Jalankan script tersebut dengan `sh scripts/import_files_coverage.sh YOUR_PACKAGE_NAME`. dimana `YOUR_PACKAGE_NAME` adalah nama package dari project Flutter anda. Script tersebut akan membuat file `test/coverage_helper_test.dart`
