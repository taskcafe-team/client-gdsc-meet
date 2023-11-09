
# Đỗ Minh Nhật 0400 #code python
# Đề bài : Bài tập số Viết chương trình nhấp vào chuổi bất kỷ sau đó in ra chuổi thành chữ IN HOA, hặy sử dụng hàm kêt class. Ví dụ: Chuỗi nhậ) vào là Python.com thi đầu ra phải là: PYTHON.COM

class StringConverter:
    def convert_to_uppercase(self, input_string):
        return input_string.upper()

def main():
    input_string = input("Nhập chuỗi: ")
    converter = StringConverter()
    result = converter.convert_to_uppercase(input_string)
    print("Chuỗi in hoa: ", result)

if __name__ == "__main__":
    main()


# Input: minh nha 
# output MINH NHA 
# —Lý thuyết—
# các định nghĩa quan trọng bên trong thật toán 
# self : con trỏ của python so sánh khá giống this của java mang nhiệm vụ tham chiếu đến obj đó 
# class : lớp dữ liệu 
# def : tạo ra 1 function 
# if __name__ == "__main__": kiểm tra xem hàm có được chạy từ tệp chính hay không 
# print: in ra trong console 
# —Ý tưởng—
# Sử dụng upper mặc định của string để in hoa tất cả các phần tử trong chuỗi kí tự 
# kết quả ta được 1 chuỗi được viết hóa toàn bộ
# —Độ phức tạp : 0(n)
#code python


