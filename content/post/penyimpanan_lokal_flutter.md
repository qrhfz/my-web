---
title : "Kumpulan Package Penyimpanan Lokal untuk Flutter"
date : "2022-03-17"
author : "Qori El-Hafizh"
cover : "/img/lia-trevarthen-gWvdUpNQr6g-unsplash.jpg"
description : "Komparasi database lokal untuk aplikasi flutter"
---

# Sqflite
Implementasi SQLite untuk flutter. Plugin ini dapat bekerja pada Andoird, iOS, & MacOS

Fitur:  
1. Transaction dan batch
2. Version management
3. Helper untuk queri insert/select/update/delete
4. Operasi database berjalan pada background thread

## Contoh Penggunaan
Membuka database
```js
// Get a location using getDatabasesPath
final databasesPath = await getDatabasesPath();
String path = join(databasesPath, 'demo.db');

// open the database
Database database = await openDatabase(path, version: 1,
    onCreate: (Database db, int version) async {
  // When creating the db, create the table
  await db.execute(
      'CREATE TABLE Test (id INTEGER PRIMARY KEY, name TEXT, value INTEGER, num REAL)');
});

```

Membuat query dengan SQL
```js
List<Map> list = await database.rawQuery('SELECT * FROM Test');
```

Melakukan Insert dengan transaction
```js
// Insert some records in a transaction
await database.transaction((txn) async {
  int id1 = await txn.rawInsert(
      'INSERT INTO Test(name, value, num) VALUES("some name", 1234, 456.789)');
  print('inserted1: $id1');
  int id2 = await txn.rawInsert(
      'INSERT INTO Test(name, value, num) VALUES(?, ?, ?)',
      ['another name', 12345678, 3.1416]);
  print('inserted2: $id2');
});
```
Informasi selengkapnya dapat dipelajari di halaman pub.dev [sqflite](https://pub.dev/packages/sqflite)

# Hive
Hive adalah database dengan jenis key-value pair yang diklaim penulisnya memiliki performa yang tinggi.

Fitur:  
1. Mendukung semua platform Flutter
2. Performan
3. API yang mudah & intuitif
4. Dilengkapi enkripsi
5. Murni Dart

## Penggunaan
Box adalah tempat key-value disimpan. Penggunaan Hive mirip dengan menggunakan Map.
```js
var box = Hive.box('myBox');

box.put('name', 'David');

var name = box.get('name');

print('Name: $name');

```

## Menyimpan Objek
Tidak hanya primitif dan collection, Hive juga dapat menyimpan sembarang objek. Buat adapter dengan menambahkan anotasi pada class objek yang ingin disimpan.
```js
@HiveType(typeId: 0)
class Person extends HiveObject {

  @HiveField(0)
  String name;

  @HiveField(1)
  int age;
}

```
Dokumentasi lengkap dapat dibaca di [sini](https://docs.hivedb.dev/)
# Objectbox
ObjectBox adalah database relasional untuk menyimpan objek Dart. Berdasarkan benchmark yang dibuat oleh author package ini, ObjectBox lebih cepat dari Hive.   

Fitur:  
1. Performan
2. ACID
3. Mendukung semua platform FLutter
4. Relasi
5. Query
6. Tipe data statis (pengecekan dan optimisasi saat compile time)
7. Migrasi skema
8. Fitur berbayar sync dengan cloud ObjectBox

## Contoh Penggunaan
```js
@Entity()
class Person {
  int id;

  String firstName;
  String lastName;

  Person({this.id = 0, required this.firstName, required this.lastName});
}

final store = await openStore(); 
final box = store.box<Person>();

var person = Person(firstName: 'Joe', lastName: 'Green');

final id = box.put(person);  // Create

person = box.get(id)!;       // Read

person.lastName = "Black";
box.put(person);             // Update

box.remove(person.id);       // Delete

// find all people whose name start with letter 'J'
final query = box.query(Person_.firstName.startsWith('J')).build();
final people = query.find();  // find() returns List<Person>
```

Dokumentasi lengkap dapat dilihat di [sini](https://docs.objectbox.io/getting-started)
# Drift
Sebelumnya bernama Moor, Drift adalah database relasional seperti sqflite yang membedakan adalah type safety dan reactivitynya.

Fitur: 
1. Menulis Query dengan Dart maupun Raw SQL
2. Auto update dengan stream
3. Mendukung semua platform Flutter
4. Performan karena menggunakan backend ffi
5. Sedikit boilerplate karena menggunakan code generation build-runner

## Contoh Penggunaan
### Definis tabel
```js
import 'package:drift/drift.dart';


part 'filename.g.dart';


class Todos extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get title => text().withLength(min: 6, max: 32)();
  TextColumn get content => text().named('body')();
  IntColumn get category => integer().nullable()();
}


@DataClassName('Category')
class Categories extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get description => text()();
}

@DriftDatabase(tables: [Todos, Categories])
class MyDatabase extends _$MyDatabase {
}
```

### Membuat query
```js
@DriftDatabase(tables: [Todos, Categories])
class MyDatabase extends _$MyDatabase {  

  Future<List<Todo>> get allTodoEntries => select(todos).get();


  Stream<List<Todo>> watchEntriesInCategory(Category c) {
    return (select(todos)..where((t) => t.category.equals(c.id))).watch();
  }
}
```
Dokumentasi lengkap [drift](https://drift.simonbinder.eu/docs)