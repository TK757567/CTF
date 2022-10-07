# marshal reverse challenge 

This write up is from JISCTF Finals it was a reverse engineering challenge with 100 point written in python.

this challenge was solved using python 3.8.5 it won't be solved using other verions
```
import marshal

exec(marshal.loads(b'\xe3\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x06\x00\x00\x00@\x00\x00\x00sX\x00\x00\x00d\x00d\x01l\x00Z\x00d\x00d\x01l\x01Z\x01d\x02Z\x02e\x02\xa0\x03d\x03d\x04\xa1\x02\xa0\x03d\x05d\x06\xa1\x02\xa0\x03d\x07d\x08\xa1\x02\xa0\x03d\td\n\xa1\x02\xa0\x03d\x0bd\x0c\xa1\x02Z\x02e\x04e\x00\xa0\x05e\x01\xa0\x06e\x02\xa1\x01\xa1\x01\x83\x01\x01\x00d\x01S\x00)\r\xe9\x00\x00\x00\x00Nad\x03\x00\x004w@@@@@@@@@@@@@@@@@@@@BI@@@@Q@@@@-O2@@@@Z@Ba@#QBZ@Jk@2QEZ@VkBmQ-Z@hkCWQKZ@tkD#QNZ@5kD#QPZ@pkE#QLZBBkD#QRZ@5kCmQKZBJkE2QRZ@1kD2QUZBVkE#QWZ@9kF2QIZBhkCWQYZ@tkEWQPZ@9kC2QUZBlkEmQ*Z@tk#mQJZBtkF#QIZBZk-#QRZBJk-WQWZ@1kFmQeZBNkD#QWZ@1kD2QVZ@5k-2dIWgFl@UQ@XRRa@mUDZQRl@o*BZCBkIY0C@QBxn#QiUw@pI1q@O#RmZW*1Z#Q4*mQzZjliZjI2Z#VmYjhmZ#UwNmQ2NDgz*2U1NjI3NjBj*mZhODQzYmJmODk0*DFi*jY5ZDRlO#JmYzE1ZTdl*mYxNz*1*WYw*D@2*mU5*mJhYz*wOW*0N2RjYz*1NDlhZjIwOTE0OTc5ZDU0YWFhZTBmZTI0ZDPpcg@@@Okt@@@@6TU@@@DpJg@@@Ok3@@@@6X*@@@Dp-w@@@OkF@@@@6Q8@@@DpUw@@@OlS@@@@6V@@@@DpVQ@@@OkO@@@@6Vc@@@Dp@w@@@Ok@@@@@6QY@@@DpB@@@@Ok*@@@@6V0@@@Dp@Q@@@OlR@@@@6QI@@@DpVg@@@Ok-@@@@6Qg@@@DpWg@@@OkK@@@@6Vw@@@Dp#@@@@No@KQ-a@2VuZE4pBVocXzBxOD*3N#dmYnF1eWliZWZw*jlmOTJu*j@5ZloSQXNkYXNkOXFf*-UzYnVmYnFmWhtfX19zYWRiO-EyYmZpX29hc25kO#J3Z#lic2TaBXByaW502gNja-Kp@-Ik@@@@ciQ@@@D6CDxzd-Jpbmc+2gg8bW9kdWxlPgE@@@BzBg@@@@QBl@EI@@  \xfa\x01-\xda\x01H\xfa\x01#\xda\x01G\xfa\x01@\xda\x01A\xfa\x01 \xfa\x01=\xda\x01*\xda\x01M)\x07\xda\x07marshal\xda\x06base64Z\x04bf8a\xda\x07replace\xda\x04exec\xda\x05loadsZ\tb64decode\xa9\x00r\x11\x00\x00\x00r\x11\x00\x00\x00\xfa\x08<string>\xda\x08<module>\x01\x00\x00\x00s\x08\x00\x00\x00\x08\x01\x08\x01\x04\x01,\x01'))
```
as you can see it's calling marshal module.

marshel module contains functions that can read and write Python values in a binary format.

here the code is calling `marshal.loads` and inside of it there is a serialized bytes-like object.

the function marshal.loads converts the serialized bytes-like object to a Python code object, then the exec function is called to execute that python code object.

Let's extract the marshalled code object and try to disassemble it with the `dis` module:

```
import marshal

code=(marshal.loads(b'\xe3\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x06\x00\x00\x00@\x00\x00\x00sX\x00\x00\x00d\x00d\x01l\x00Z\x00d\x00d\x01l\x01Z\x01d\x02Z\x02e\x02\xa0\x03d\x03d\x04\xa1\x02\xa0\x03d\x05d\x06\xa1\x02\xa0\x03d\x07d\x08\xa1\x02\xa0\x03d\td\n\xa1\x02\xa0\x03d\x0bd\x0c\xa1\x02Z\x02e\x04e\x00\xa0\x05e\x01\xa0\x06e\x02\xa1\x01\xa1\x01\x83\x01\x01\x00d\x01S\x00)\r\xe9\x00\x00\x00\x00Nad\x03\x00\x004w@@@@@@@@@@@@@@@@@@@@BI@@@@Q@@@@-O2@@@@Z@Ba@#QBZ@Jk@2QEZ@VkBmQ-Z@hkCWQKZ@tkD#QNZ@5kD#QPZ@pkE#QLZBBkD#QRZ@5kCmQKZBJkE2QRZ@1kD2QUZBVkE#QWZ@9kF2QIZBhkCWQYZ@tkEWQPZ@9kC2QUZBlkEmQ*Z@tk#mQJZBtkF#QIZBZk-#QRZBJk-WQWZ@1kFmQeZBNkD#QWZ@1kD2QVZ@5k-2dIWgFl@UQ@XRRa@mUDZQRl@o*BZCBkIY0C@QBxn#QiUw@pI1q@O#RmZW*1Z#Q4*mQzZjliZjI2Z#VmYjhmZ#UwNmQ2NDgz*2U1NjI3NjBj*mZhODQzYmJmODk0*DFi*jY5ZDRlO#JmYzE1ZTdl*mYxNz*1*WYw*D@2*mU5*mJhYz*wOW*0N2RjYz*1NDlhZjIwOTE0OTc5ZDU0YWFhZTBmZTI0ZDPpcg@@@Okt@@@@6TU@@@DpJg@@@Ok3@@@@6X*@@@Dp-w@@@OkF@@@@6Q8@@@DpUw@@@OlS@@@@6V@@@@DpVQ@@@OkO@@@@6Vc@@@Dp@w@@@Ok@@@@@6QY@@@DpB@@@@Ok*@@@@6V0@@@Dp@Q@@@OlR@@@@6QI@@@DpVg@@@Ok-@@@@6Qg@@@DpWg@@@OkK@@@@6Vw@@@Dp#@@@@No@KQ-a@2VuZE4pBVocXzBxOD*3N#dmYnF1eWliZWZw*jlmOTJu*j@5ZloSQXNkYXNkOXFf*-UzYnVmYnFmWhtfX19zYWRiO-EyYmZpX29hc25kO#J3Z#lic2TaBXByaW502gNja-Kp@-Ik@@@@ciQ@@@D6CDxzd-Jpbmc+2gg8bW9kdWxlPgE@@@BzBg@@@@QBl@EI@@  \xfa\x01-\xda\x01H\xfa\x01#\xda\x01G\xfa\x01@\xda\x01A\xfa\x01 \xfa\x01=\xda\x01*\xda\x01M)\x07\xda\x07marshal\xda\x06base64Z\x04bf8a\xda\x07replace\xda\x04exec\xda\x05loadsZ\tb64decode\xa9\x00r\x11\x00\x00\x00r\x11\x00\x00\x00\xfa\x08<string>\xda\x08<module>\x01\x00\x00\x00s\x08\x00\x00\x00\x08\x01\x08\x01\x04\x01,\x01'))

dis.dis(code)
```

here is the resaults:

<img src="images_marshel/Capture2.PNG" >
