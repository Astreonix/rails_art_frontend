const WHATSAPP_NUMBER = '923001234567';

export default function WhatsAppButton({ message = 'Hello Rails Art, I have a question about your products.' }) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-lg"
      aria-label="Chat on WhatsApp"
    >
      💬
    </a>
  );
}
