# Wide

_Wide_ is an easy reverse challenge

we have an elf file `wide` and a matlab file `db.ex`

tried an execute it but it needs to be executed with `db.ex`

```
Usage: ./wide db.ex
```

after executing it with the `dc.ex` we've got this.

```
[*] Welcome user: kr4eq4L2$12xb, to the Widely Inflated Dimension Editor [*]
[*]    Serving your pocket dimension storage needs since 14,012.5 B      [*]
[*]                       Displaying Dimensions....                      [*]
[*]       Name       |              Code                |   Encrypted    [*]
[X] Primus           | people breathe variety practice  |                [*]
[X] Cheagaz          | scene control river importance   |                [*]
[X] Byenoovia        | fighting cast it parallel        |                [*]
[X] Cloteprea        | facing motor unusual heavy       |                [*]
[X] Maraqa           | stomach motion sale valuable     |                [*]
[X] Aidor            | feathers stream sides gate       |                [*]
[X] Flaggle Alpha    | admin secret power hidden        |       *        [*]
Which dimension would you like to examine? 
```
to through these dimensions we need to enter numbers from 1 to 6 each number reprsents a dimension.

```
Which dimension would you like to examine? 1
The Ice Dimension
Which dimension would you like to examine? 2
The Berserk Dimension
Which dimension would you like to examine? 3
The Hungry Dimension
Which dimension would you like to examine? 4
The Water Dimension
Which dimension would you like to examine? 5
The Bone Dimension
Which dimension would you like to examine? 6
[X] That entry is encrypted - please enter your WIDE decryption key: 
```
the 6th dimension needs a key, tried to use ltrace to see if it is comparing the input with the key but it's useless.

i opened the elf file with ghidra and started looking for that key.

```
    printf("[X] That entry is encrypted - please enter your WIDE decryption key: ");
    fgets(local_c8,0x10,stdin);
    mbstowcs(local_1c8,local_c8,0x10);
    iVar1 = wcscmp(local_1c8,L"sup3rs3cr3tw1d3");
    if (iVar1 == 0) {
      for (local_1d4 = 0;
          (local_1d4 < 0x80 && (*(char *)((long)&local_98 + (long)(int)local_1d4) != '\0'));
          local_1d4 = local_1d4 + 1) {
        *(byte *)((long)&local_98 + (long)(int)local_1d4) =
             *(byte *)((long)&local_98 + (long)(int)local_1d4) ^
             (char)(local_1d4 * 0x1b) + (char)((int)(local_1d4 * 0x1b) / 0xff);
      }
```
there was a comparing function after all `wcscmp`

```
The wcscmp() function is the wide-character equivalent of the strcmp(3) function. It compares the wide-character string pointed to by s1 and the wide-character string pointed to by s2. ```
```
anyway,we've got the key we needed in the menu function not in the main function.

```
Which dimension would you like to examine? 6
[X] That entry is encrypted - please enter your WIDE decryption key: sup3rs3cr3tw1d3
HTB{str1ngs_4r3nt_4lw4ys_4sc11}
Which dimension would you like to examine? Our home dimension
Which dimension would you like to examine? 
```
and there is our flag _HTB{str1ngs_4r3nt_4lw4ys_4sc11}_
