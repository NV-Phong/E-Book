"use client";

import React, { useState, useEffect } from "react";
import { usePayOS } from "@payos/payos-checkout";

const ProductDisplay = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [message, setMessage] = useState("");
   const [isCreatingLink, setIsCreatingLink] = useState(false);

   const [payOSConfig, setPayOSConfig] = useState({
      RETURN_URL: "",
      ELEMENT_ID: "embedded-payment-container",
      CHECKOUT_URL: "",
      embedded: true,
      onSuccess: () => {
         setIsOpen(false);
         setMessage("Thanh toán thành công!");
      },
   });

   const { open, exit } = usePayOS(payOSConfig);

   // Cập nhật RETURN_URL sau khi mount
   useEffect(() => {
      setPayOSConfig((old) => ({
         ...old,
         RETURN_URL: window.location.href,
      }));
   }, []);

   const handleGetPaymentLink = async () => {
      setIsCreatingLink(true);
      try {
         const response = await fetch("/api/next/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               orderCode: Number(String(Date.now()).slice(-6)),
               amount: 10000,
               description: "Thanh toán đơn hàng",
               items: [
                  { name: "Mì tôm Hảo Hảo ly", quantity: 1, price: 10000 },
               ],
               returnUrl: window.location.href,
               cancelUrl: window.location.href,
            }),
         });

         if (!response.ok) throw new Error("Server không phản hồi");

         const result = await response.json();

         setPayOSConfig((old) => ({
            ...old,
            CHECKOUT_URL: result.checkoutUrl,
         }));

         setIsOpen(true);
      } catch (err) {
         console.error(err);
      } finally {
         setIsCreatingLink(false);
      }
   };

   useEffect(() => {
      if (payOSConfig.CHECKOUT_URL) open();
   }, [payOSConfig.CHECKOUT_URL, open]);

   return message ? (
      <Message message={message} />
   ) : (
      <div className="main-box">
         <div className="checkout">
            <div className="product">
               <p>
                  <strong>Tên sản phẩm:</strong> Mì tôm Hảo Hảo ly
               </p>
               <p>
                  <strong>Giá tiền:</strong> 10000 VNĐ
               </p>
               <p>
                  <strong>Số lượng:</strong> 1
               </p>
            </div>

            <div className="flex">
               {!isOpen ? (
                  isCreatingLink ? (
                     <div
                        style={{
                           textAlign: "center",
                           padding: "10px",
                           fontWeight: 600,
                        }}
                     >
                        Creating Link...
                     </div>
                  ) : (
                     <button
                        id="create-payment-link-btn"
                        onClick={(e) => {
                           e.preventDefault();
                           handleGetPaymentLink();
                        }}
                     >
                        Tạo Link thanh toán Embedded
                     </button>
                  )
               ) : (
                  <button
                     style={{
                        backgroundColor: "gray",
                        color: "white",
                        width: "100%",
                        padding: "10px 0",
                        fontSize: "14px",
                        marginTop: "5px",
                     }}
                     onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        exit();
                     }}
                  >
                     Đóng Link
                  </button>
               )}
            </div>

            {isOpen && (
               <div style={{ maxWidth: "400px", padding: "2px" }}>
                  Sau khi thanh toán thành công, vui lòng đợi 5-10s để hệ thống
                  tự động cập nhật.
               </div>
            )}

            <div
               id="embedded-payment-container"
               style={{ height: "350px" }}
            ></div>
         </div>
      </div>
   );
};

const Message = ({ message }: { message: string }) => (
   <div className="main-box">
      <div className="checkout">
         <div
            className="product"
            style={{ textAlign: "center", fontWeight: 500 }}
         >
            <p>{message}</p>
         </div>
         <form action="/">
            <button type="submit" id="create-payment-link-btn">
               Quay lại trang thanh toán
            </button>
         </form>
      </div>
   </div>
);

export default function App() {
   return <ProductDisplay />;
}
