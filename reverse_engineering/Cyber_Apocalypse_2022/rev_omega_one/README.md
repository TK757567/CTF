# omega-one

_omega-one_ is an easy reverse challenge.

in this challenge we have an output file that contains some random names

```
Crerceon 
Ezains   
Ummuh
Zonnu
Vinzo
Cuzads
Emoi
Ohols
Groz'ens
Ukox
Ehnu 
.
.
.
etc
```
and an excutable file _omega-one_, I have tried to execute it but didn't have any thing special.

let's open it in _IDA_ shall we.

<img src="images/Capture.JPG" >

It seems that in the main function it's calling 3 different functions `sub_1673` , `sub_2120` and `sub_1870`.

`sub_1870` function called many time as you can see in the image, it contians two arguments, a character and a name.

I realized that every name in this funcion represnts a charachter.
```
"k"--> "Lendrens"
"d"--> "Thauv'i"
"P"--> "Throrqiek"
"e"--> "Inqods"
"6"--> "Tarquts"
"p"--> "Dut"
"A"--> "Krolkel"
"n"--> "Emoi"
"|"--> "Dakroith"
"*"--> "Creiqex"
"Y"--> "Thomois"
"4"--> "Groz'ens"
"D"--> "Urqek"
"v"--> "Nid"
...etc
```
lets try matching the characters with our output.

the first 3 names in the output file are `Crerceon`,`Ezains` and `Ummuh`, 
if we go back to _IDA_ we will see that these the characters of these `H`,`T`and `B` thats the first 3 letters of out flag
```
"H" --> "Crerceon"
"T" --> "Ezains"
"B"--> "Ummuh"
```
after comparing every name in the output with our elf file in _IDA_ (it will take sometime i know) we will get this flag

`HTB{l1n34r_t1m3_but_pr3tty_sl0w!}`
