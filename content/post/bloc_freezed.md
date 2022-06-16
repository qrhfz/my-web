---
title : State Management dengan Kombinasi Bloc dan Freezed
date : "2021-12-12"
author : Qori El-Hafizh
cover : /img/scott-rodgerson-PteeDvACFak-unsplash.jpg
description : State management yang mudah dengan immutable data class
---

# Apa itu Bloc dan Cubit
Bloc pada flutter adalah state management yang menerapkan Design Pattern Business Logic Component. Bloc memisahkan presentation layer dari Business Logic. Pada Bloc UI menerima dan mengirim data menggunakan Stream. Artikel ini akan menggunakan Cubit yang merupakan versi lebih sederhana dari Bloc. Perbedaan Cubit dan Bloc adalah Cubit menggunakan function dari UI untuk meminta data ke Business Logic.

# Apa itu Freezed
Freezed adalah code generator di dart untuk membuat data class dan union. Artikel ini menggunakan freezed sebagai state dari Cubit. Dengan memanfaatkan fitur pattern matching dari freezed, developer dapat membuat dan memetakan state ke ui dengan mudah.

# Aplikasi
Pada tutorial ini kita akan membuat contoh penggunaan Cubit dan Freezed dengan memanggil sebuah fungsi async untuk mensimulasi pemanggilan data dari internet.

# Install Dependency
Install package-package berikut sebagai dependency  
- flutter_bloc
- freezed_annotation

Install package package berikut sebagai dev
- build_runner
- freezed

# Struktur Project
```
lib/  
├─ cubit/  
│  ├─ fake_http_call_cubit.dart  
│  ├─ fake_http_call_cubit.freezed.dart  
│  ├─ fake_http_call_state.dart  
├─ home_page.dart  
├─ main.dart  
```

# Membuat Cubit
Pertama buat file cubit dengan statenya
fake_http_call_cubit.dart
```dart
part 'fake_http_call_state.dart';
part 'fake_http_call_cubit.freezed.dart';

class FakeHttpCallCubit extends Cubit<FakeHttpCallState> {
  FakeHttpCallCubit() : super(const FakeHttpCallState.init());

  void fetchData() async {
    //Todo
  }

  void fetchDataEmpty() async {
    //TODO
  }

  void fetchDataError() async {
    //TODO
  }
}
```

# Membuat class state dengan freezed
fake_http_call_state.dart
```dart
part of 'fake_http_call_cubit.dart';

@freezed
class FakeHttpCallState with _$FakeHttpCallState {
  const factory FakeHttpCallState.init() = _Init;
  const factory FakeHttpCallState.loading() = _Loading;
  const factory FakeHttpCallState.noData() = _NoData;
  const factory FakeHttpCallState.hasData(List<String> languages) = _HasData;
  const factory FakeHttpCallState.error(String message) = _Error;
}
```
Setiap factory di dalam class tersebut merepresentasikan setiap state untuk FakeHttpCallCubit. State loading mampu menampung data berupa List String. Sedangkan state error mampu menampung data String.

# Build Runner
Jalankan build runner dengan menjalankan command ini di terminal
```
flutter pub run build_runner build
```
Apabila build runner berhasil maka file fake_http_call_cubit.freezed.dart akan terbentuk dan peringatan error dari IDE akan hilang

# Lengkapi Cubit
Isikan method-method pada cubit menjadi seperti ini
```dart


  void fetchData() async {
    emit(FakeHttpCallState.loading());
    await Future.delayed(const Duration(seconds: 1));
    emit(FakeHttpCallState.hasData(["Dart", "Kotlin", "dart", "Rust"]));
  }

  void fetchDataEmpty() async {
    emit(FakeHttpCallState.loading());
    await Future.delayed(const Duration(seconds: 1));
    emit(FakeHttpCallState.noData());
  }

  void fetchDataError() async {
    emit(FakeHttpCallState.loading());
    await Future.delayed(const Duration(seconds: 1));
    emit(FakeHttpCallState.error("Gagal terhubung ke server"));
  }

```
Method emit dari Cubit digunakan untuk memperbarui state. contoh pada method fetchData, emit dipanggil untuk mengganti state menjadi loading.

Kemudian untuk mensimulasikan waktu loading digunakanlah Future.delayed sepanjang 1 detik. Setelah itu di emit lah state hasData dengan isi List String.

# UI Layer
*Suntikan* cubit ke widget HomePage dengan BlocProvider  
main.dart
```dart
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: BlocProvider(
        create: (context) => FakeHttpCallCubit(),
        child: const HomePage(),
      ),
    );
  }
}
```

Buat halaman HomePage
```dart
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
            //TODO
          _content(),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              ElevatedButton(
                onPressed: () {
                  context.read<FakeHttpCallCubit>().fetchData();
                },
                child: const Text('Fetch Data'),
              ),
              ElevatedButton(
                onPressed: () {
                  context.read<FakeHttpCallCubit>().fetchDataEmpty();
                },
                child: const Text('Fetch Data Kosong'),
              ),
              ElevatedButton(
                onPressed: () {
                  context.read<FakeHttpCallCubit>().fetchDataError();
                },
                child: const Text('Fetch Error'),
              ),
            ],
          )
        ],
      ),
    );
  }
```

Consume FakeHttpCallCubit dengan menggunakan BlocBuilder di dalam helper method _content()
```dart
Widget _content() {
    return BlocBuilder<FakeHttpCallCubit, FakeHttpCallState>(
      builder: (context, state) {
        return state.when(
          init: () => Container(),
          loading: () => const CircularProgressIndicator(),
          noData: () => const Text(
            'Data Kosong',
            style: TextStyle(fontSize: 24),
          ),
          hasData: (languages) {
            return Column(
              mainAxisSize: MainAxisSize.min,
              children: List.generate(
                languages.length,
                (index) => Text(
                  languages[index],
                  style: const TextStyle(fontSize: 24),
                ),
              ),
            );
          },
          error: (message) => Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.error),
              Text(
                message,
                style: const TextStyle(fontSize: 24),
              ),
            ],
          ),
        );
      },
    );
  }
```
Method .when merupakan pattern matching yang memetakan setiap state agar mereturn nilai yang dalam hal ini adalah widget. State init mereturn Container(), Loading mereturn CircularProgressIndicator. hasData mereturn Column berisi List Text. dan Error mereturn Icon dan Text yang berisi pesan error.


