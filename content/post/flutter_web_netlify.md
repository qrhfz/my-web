---
title : "Cara Deploy Flutter Web di Netlify dengan Continous Deployment"
date : "2022-03-23"
author : "Qori El-Hafizh"
cover : "/img/undraw_Pair_programming_re_or4x.png"
description : "Cara setup build di Netlify untuk flutter web"
---

Flutter mendukung pengembangan aplikasi web. Salah satu penyedia hosting aplikasi frontwend web yang popular adalah Netlify. Masalahnya Netlify tidak menyediakan Flutter SDK out of the box. Berikut adalah cara mengkonfigurasi build netlify untuk Flutter web.

# Tutorial
Tambahkan git project anda ke Netlify seperti biasa.

Konfigurasi build menjadi seperti ini:  
  
Build command :  
```bash
if cd flutter; then git pull && cd ..; else git clone https://github.com/flutter/flutter.git; fi && flutter/bin/flutter config --enable-web && flutter/bin/flutter build web --release
```
Publish directory:
```
build/web
```

Build command tersebut akan mengecek apakah ada cache Flutter SDK di folder flutter. Jika ada maka akan melakukan pull. Jika tidak ada maka akan melakukan clone dari github flutter. Kemudian command tersebut akan mengaktifkan flutter web dan mem-build project untuk web dengan mode release.