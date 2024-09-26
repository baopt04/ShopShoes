
create database ShoesShop
go
Use ShoesShop
go


CREATE TABLE Chuc_Vu (
Id_Chuc_Vu int primary key  IDENTITY(1,1),
Ma_CV NVARCHAR(50) NOT NULL,
Ten_CV NVARCHAR(100) NOT NULL,
 Trang_Thai BIT
 )


CREATE TABLE Nhan_Vien (
    ID_Nhan_Vien INT PRIMARY KEY IDENTITY(1,1),
    Tai_Khoan NVARCHAR(100) NOT NULL , 
    Mat_Khau NVARCHAR(255) NOT NULL,
    Ho_Ten NVARCHAR(100) NOT NULL,
    Gioi_Tinh NVARCHAR(10), 
    Ngay_Sinh DATE , 
    Dia_Chi NVARCHAR(255),
    Email NVARCHAR(100),
    SDT NVARCHAR(20),
    CCCD NVARCHAR(12), 
    Trang_Thai BIT,
    Anh NVARCHAR(MAX), 
     Ngay_Vao_Lam DATETIME,
    Ngay_Tao DATETIME DEFAULT GETDATE(), 
    Ngay_Cap_Nhat DATETIME DEFAULT GETDATE() ,
	Id_Chuc_Vu int ,
  CONSTRAINT FK_NhanVien_ChucVu FOREIGN KEY (Id_Chuc_Vu) REFERENCES Chuc_Vu(Id_Chuc_Vu)
);

 CREATE TABLE Khach_Hang (
    ID_Khach_Hang INT PRIMARY KEY IDENTITY(1,1),
     Tai_Khoan NVARCHAR(100) NOT NULL , 
    Mat_Khau NVARCHAR(255) NOT NULL,
    Ho_Ten NVARCHAR(100) NOT NULL, 
    Ngay_Sinh DATE, -- Date of birth
    SDT NVARCHAR(20), -- Phone number
    Email NVARCHAR(100), -- Email address
    Gioi_Tinh NVARCHAR(10) ,-- Gender
	 Trang_Thai BIT 
);
CREATE TABLE Tich_Diem (
    Id_Tich_Diem INT PRIMARY KEY IDENTITY(1,1),  
    Ma_Tich_Diem NVARCHAR(50) NOT NULL UNIQUE,
    Diem_Quy_Doi DECIMAL(18, 2),
    So_Tien_Quy_Doi  DECIMAL(18, 2),              
    Trang_Thai NVARCHAR(50),                
    Ghi_Chu NVARCHAR(MAX),        
        ID_Khach_Hang INT,                
  CONSTRAINT FK_TichDiem_KhachHang  FOREIGN KEY (ID_Khach_Hang) REFERENCES Khach_Hang(ID_Khach_Hang) 
  )

CREATE TABLE Dia_Chi (
    ID_Dia_Chi INT PRIMARY KEY IDENTITY(1,1) ,
    Quan NVARCHAR(255)   ,
    Huyen NVARCHAR(255),
    Thanh_Pho NVARCHAR(255),
    Ngay_tao DATETIME DEFAULT GETDATE(),
    Ngay_cap_nhat DATETIME DEFAULT GETDATE(),
    Trang_Thai BIT,
    Ghi_Chu NVARCHAR(MAX),     
	 ID_Khach_Hang INT,
 CONSTRAINT FK_DiaChi_KhachHang   FOREIGN KEY (ID_Khach_Hang) REFERENCES Khach_Hang(ID_Khach_Hang)
);

CREATE TABLE Xuat_Su (
    ID_Xuat_Su INT PRIMARY KEY IDENTITY(1,1),
    Ten_Xuat_Su NVARCHAR(255)NOT NULL UNIQUE,
    Dia_Chi NVARCHAR(255) ,
     Ghi_Chu NVARCHAR(MAX),     
);

CREATE TABLE Thuong_Hieu (
    ID_Thuong_Hieu INT PRIMARY KEY  IDENTITY(1,1),
    Ten_Thuong_Hieu NVARCHAR(255)NOT NULL UNIQUE,
    Ghi_Chu NVARCHAR(MAX),     
	ID_Xuat_Su int ,
	CONSTRAINT FK_ThuongHieu_XuatXu FOREIGN KEY (ID_Xuat_Su) REFERENCES Xuat_Su(ID_Xuat_Su)
);



CREATE TABLE Danh_Muc (
    ID_Danh_Muc INT PRIMARY KEY IDENTITY(1,1),
    Ten_Danh_Muc NVARCHAR(255) NOT NULL UNIQUE,
	 Ghi_Chu NVARCHAR(MAX),     
);


CREATE TABLE Kich_Co (
    ID_Kich_Co INT PRIMARY KEY IDENTITY(1,1),
    Size NVARCHAR(50) NOT NULL UNIQUE,
    Trang_Thai BIT ,
	 Ghi_Chu NVARCHAR(MAX),     
);

CREATE TABLE Mau_Sac (
    ID_Mau_Sac INT PRIMARY KEY IDENTITY(1,1),
    Ten_Mau_Sac NVARCHAR(50)NOT NULL UNIQUE,
    Trang_Thai BIT ,
	 Ghi_Chu NVARCHAR(MAX),     
);

CREATE TABLE Chat_Lieu (
    ID_Chat_Lieu INT PRIMARY KEY IDENTITY(1,1),
    Ten_Chat_Lieu NVARCHAR(50)NOT NULL UNIQUE,
    Trang_Thai BIT ,
	 Ghi_Chu NVARCHAR(MAX),     
);


CREATE TABLE San_Pham (
    ID_San_Pham INT PRIMARY KEY IDENTITY(1,1),
    Ma_San_Pham NVARCHAR(255) NOT NULL UNIQUE,
    Ten_San_Pham NVARCHAR(255) NOT NULL  ,
   Ngay_Tao DATETIME DEFAULT GETDATE(),
  Ngay_Cap_Nhat DATETIME DEFAULT GETDATE(),
   Ghi_Chu NVARCHAR(MAX),     
    ID_Thuong_Hieu INT,
    ID_Danh_Muc INT,
 CONSTRAINT FK_SanPham_ThuongHieu   FOREIGN KEY (ID_Thuong_Hieu) REFERENCES Thuong_Hieu(ID_Thuong_Hieu),
   CONSTRAINT FK_SanPham_DanhMuc FOREIGN KEY (ID_Danh_Muc) REFERENCES Danh_Muc(ID_Danh_Muc)
);

CREATE TABLE ANH(
    ID_Anh  INT PRIMARY KEY IDENTITY(1,1),
    Ten_Anh NVARCHAR(255) NOT NULL ,
    URL_Anh NVARCHAR(MAX) , 
     Ngay_Tao DATETIME DEFAULT GETDATE(), 
    Ngay_Cap_Nhat DATETIME DEFAULT GETDATE() ,
     Ghi_Chu NVARCHAR(MAX),    
     ID_San_Pham INT , 
      CONSTRAINT FK_Anh_SanPham   FOREIGN KEY (ID_San_Pham) REFERENCES San_Pham(ID_San_Pham)
)

CREATE TABLE San_Pham_Chi_Tiet (
    ID_San_Pham_Chi_Tiet INT PRIMARY KEY IDENTITY(1,1),
    ID_San_Pham INT,
    ID_Kich_Co INT,
    ID_Mau_Sac INT,
    ID_Chat_Lieu INT,
    Khoi_Luong NVARCHAR(20) ,
	Gia_Nhap DECIMAL(18, 2),
    Gia_Ban DECIMAL(18, 2),
	 So_Luong_Ton int ,
    Trang_Thai BIT,
	 Ghi_Chu NVARCHAR(MAX),     
     Ngay_Tao DATETIME DEFAULT GETDATE(), 
    Ngay_Cap_Nhat DATETIME DEFAULT GETDATE() ,
   CONSTRAINT FK_SanPhamChiTiet_SanPham FOREIGN KEY (ID_San_Pham) REFERENCES San_Pham(ID_San_Pham),
  CONSTRAINT FK_SanPhamChiTiet_KichCo FOREIGN KEY (ID_Kich_Co) REFERENCES Kich_Co(ID_Kich_Co),
  CONSTRAINT FK_SanPhamChiTiet_MauSac  FOREIGN KEY (ID_Mau_Sac) REFERENCES Mau_Sac(ID_Mau_Sac),
   CONSTRAINT FK_SanPhamChiTiet_ChatLieu FOREIGN KEY (ID_Chat_Lieu) REFERENCES Chat_Lieu(ID_Chat_Lieu)
);

CREATE TABLE Khuyen_Mai (
    ID_Khuyen_Mai INT PRIMARY KEY IDENTITY(1,1), 
    Ten_Khuyen_Mai NVARCHAR(255) NOT NULL UNIQUE,                
    Hinh_Thuc NVARCHAR(255),                     
    Muc_Giam_Gia DECIMAL(18, 2),                 
    Thoi_Gian_Bat_Dau DATETIME,                  
    Thoi_Gian_Ket_Thuc DATETIME,                   
    Ghi_Chu NVARCHAR(MAX),                        
    So_Luong INT,                                
    Trang_Thai BIT,                              
    Dieu_Kien_Ap_Dung NVARCHAR(255), 
    Loai_Khuyen_Mai NVARCHAR(255),  
     Ngay_Tao DATETIME DEFAULT GETDATE(), 
    Ngay_Cap_Nhat DATETIME DEFAULT GETDATE() ,          
    ID_Nhan_Vien INT ,
   CONSTRAINT FK_KhuyenMai_NhanVien FOREIGN KEY (ID_Nhan_Vien) REFERENCES Nhan_Vien(ID_Nhan_Vien)                                   
);

CREATE TABLE Hoa_Don (
    ID_Hoa_Don INT PRIMARY KEY  IDENTITY(1,1),
	Ma_Hoa_Don nvarchar(200) , 
    Tong_Tien DECIMAL(18, 2),
	   Tong_Tien_Sau_KM FLOAT,
    Trang_Thai BIT,
     Ghi_Chu NVARCHAR(MAX),
      Ngay_Tao DATETIME DEFAULT GETDATE(),
	 Ngay_Cap_Nhat DATETIME DEFAULT GETDATE(),     
	    ID_Nhan_Vien INT,
    ID_Khach_Hang INT,
    ID_Khuyen_Mai INT,
	CONSTRAINT FK_HoaDon_NhanVien FOREIGN KEY (ID_Nhan_Vien) REFERENCES Nhan_Vien(ID_Nhan_Vien),
	CONSTRAINT FK_HoaDon_KhachHang  FOREIGN KEY (ID_Khach_Hang) REFERENCES Khach_Hang(ID_Khach_Hang),
	 CONSTRAINT FK_HoaDon_KhuyenMai  FOREIGN KEY (ID_Khuyen_Mai) REFERENCES Khuyen_Mai(ID_Khuyen_Mai)
);

CREATE TABLE Hoa_Don_Chi_Tiet (
    ID_Hoa_Don_Chi_Tiet INT PRIMARY KEY IDENTITY(1,1),
    ID_Hoa_Don INT,
    ID_San_Pham_Chi_Tiet INT,
    So_Luong INT,
    Don_Gia DECIMAL(18, 2),
   Ghi_Chu NVARCHAR(MAX),     
    Trang_Thai BIT,
   CONSTRAINT FK_HoaDonChiTiet_HoaDon FOREIGN KEY (ID_Hoa_Don) REFERENCES Hoa_Don(ID_Hoa_Don),
   CONSTRAINT FK_HoaDonChiTiet_SanPhamChiTiet FOREIGN KEY (ID_San_Pham_Chi_Tiet) REFERENCES San_Pham_Chi_Tiet(ID_San_Pham_Chi_Tiet)
);



CREATE TABLE Gio_Hang (
    ID_Gio_Hang INT PRIMARY KEY IDENTITY(1,1),    
    Ma_Gio_Hang NVARCHAR(50) UNIQUE,                     
    Ngay_Tao DATETIME DEFAULT GETDATE(),   
    Ngay_Cap_Nhat DATETIME DEFAULT GETDATE(),        
    Trang_Thai BIT,                             
    ID_Khach_Hang INT,                           
    Ghi_Chu NVARCHAR(MAX),
  CONSTRAINT FK_GioHang_KhachHang  FOREIGN KEY (ID_Khach_Hang) REFERENCES Khach_Hang(ID_Khach_Hang) 
);

CREATE TABLE Gio_Hang_Chi_Tiet (
    ID_Gio_Hang_Chi_Tiet INT PRIMARY KEY IDENTITY(1,1),   
    ID_Gio_Hang INT,                                    
    ID_San_Pham_Chi_Tiet INT,                                      
    So_Luong INT,                                     
    Tinh_Trang NVARCHAR(50),                          
    Don_Gia DECIMAL(18, 2),                            
    Don_Gia_Khi_Giam DECIMAL(18, 2),                    
    Ghi_Chu NVARCHAR(MAX),  
     ID_Khuyen_Mai INT NULL,                          
    CONSTRAINT FK_GioHangChiTiet_GioHang FOREIGN KEY (ID_Gio_Hang) REFERENCES Gio_Hang(ID_Gio_Hang),  
  CONSTRAINT FK_GioHangChiTiet_SanPhamChiTiet  FOREIGN KEY (ID_San_Pham_Chi_Tiet) REFERENCES San_Pham_Chi_Tiet(ID_San_Pham_Chi_Tiet)  ,
     CONSTRAINT FK_GioHangChiTiet_KhuyenMai FOREIGN KEY (ID_Khuyen_Mai) REFERENCES Khuyen_Mai(ID_Khuyen_Mai)
);



