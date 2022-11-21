import sys
import qrcode  

qr_img = qrcode.make(sys.argv[1])
qr_img.save("uploads/qr-img.jpg")