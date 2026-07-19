"use client";

import { useMemo, useRef, useState } from "react";
import { MENU, SERVING_COURSES } from "@/data/menu";
import { applyCartDelta, cartLineItems, cartSubtotal } from "@/lib/cart";
import { buildQuoteHtml, openQuotePrintWindow } from "@/lib/quote";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import type { Cart, EventInfo, EventInfoErrors } from "@/types/menu";
import { AboutModal } from "@/components/AboutModal";
import { AboutTeaser } from "@/components/AboutTeaser";
import { BackgroundSlideshow } from "@/components/BackgroundSlideshow";
import { CartBar } from "@/components/CartBar";
import { CategoryCarousel } from "@/components/CategoryCarousel";
import { CategoryDrawer } from "@/components/CategoryDrawer";
import { EventForm } from "@/components/EventForm";
import { Hero } from "@/components/Hero";
import { MenuItemCard } from "@/components/MenuItemCard";

const emptyErrors: EventInfoErrors = { name: false, address: false, guests: false };

export function HomeClient() {
  const [cart, setCart] = useState<Cart>({});
  const [info, setInfo] = useState<EventInfo>({
    name: "",
    address: "",
    guests: "",
    note: "",
  });
  const [errors, setErrors] = useState<EventInfoErrors>(emptyErrors);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("הכל");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showCartReview, setShowCartReview] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState<Set<number>>(new Set());

  const formRef = useRef<HTMLFormElement>(null);

  const filteredMenu = useMemo(
    () => (activeCategory === "הכל" ? MENU : MENU.filter((m) => m.category === activeCategory)),
    [activeCategory]
  );

  const menuByCourse = useMemo(
    () =>
      SERVING_COURSES.map((course) => ({
        ...course,
        items: course.categories.flatMap((cat) => MENU.filter((m) => m.category === cat)),
      })).filter((course) => course.items.length > 0),
    []
  );

  const update = (id: number, delta: number) => {
    setCart((prev) => applyCartDelta(prev, id, delta));
    setCheckoutError(null);
  };

  const subtotal = cartSubtotal(cart);
  const items = cartLineItems(cart);
  const reviewOpen = showCartReview && subtotal > 0;

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const validate = (): boolean => {
    if (subtotal === 0) {
      setCheckoutError("העגלה ריקה — יש לבחור מנות לפני הפעולה.");
      return false;
    }

    const nextErrors: EventInfoErrors = {
      name: !info.name.trim(),
      address: !info.address.trim(),
      guests: !info.guests.trim(),
    };
    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.address || nextErrors.guests) {
      setCheckoutError("נא למלא את פרטי האירוע לפני המשך.");
      scrollToForm();
      return false;
    }

    setCheckoutError(null);
    return true;
  };

  const send = () => {
    if (!validate()) return;
    window.open(buildWhatsAppOrderUrl(cart, info));
  };

  const generateQuote = () => {
    if (!validate()) return;

    const quoteItems = items.map((item) => ({
      name: item.name,
      desc: item.desc,
      price: item.price,
      qty: item.qty,
      total: item.total,
    }));

    const html = buildQuoteHtml({
      items: quoteItems,
      info,
      subtotal,
      logoUrl: `${window.location.origin}/logo.jpg`,
    });
    openQuotePrintWindow(html);
  };

  return (
    <main className="min-h-screen bg-transparent text-white pb-28 px-4 relative z-10 overflow-x-hidden" dir="rtl">
      <BackgroundSlideshow />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 bg-brand text-white p-4 rounded-xl z-[60] font-bold"
      >
        דלג לתוכן המרכזי
      </a>

      <div className="relative">
        <Hero
          isMenuOpen={isMenuOpen}
          onOpenMenu={() => setIsMenuOpen(true)}
          onResetCategory={() => setActiveCategory("הכל")}
        />

        <CategoryDrawer
          open={isMenuOpen}
          activeCategory={activeCategory}
          onClose={() => setIsMenuOpen(false)}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setIsMenuOpen(false);
          }}
          onOpenAbout={() => setShowAbout(true)}
        />

        <AboutModal open={showAbout} onClose={() => setShowAbout(false)} />

        <div id="main-content" className="max-w-xl lg:max-w-5xl mx-auto mt-4">
          <div id="menu">
            <h2 className="font-display text-center text-brand text-sm font-bold mb-6 tracking-widest uppercase motion-safe:animate-section-in">
              {activeCategory === "הכל" ? "כל המנות" : activeCategory}
            </h2>

            {activeCategory === "הכל" ? (
              menuByCourse.map((course, courseIndex) => (
                <section key={course.title} className="mb-8">
                  <h3
                    className="font-display text-center text-white text-xl font-bold pt-4 pb-3 border-b border-brand/30 motion-safe:animate-section-in"
                    style={{ animationDelay: `${courseIndex * 60}ms` }}
                  >
                    {course.title}
                  </h3>
                  <CategoryCarousel label={course.title}>
                    {course.items.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        qty={cart[item.id] || 0}
                        update={update}
                        variant="carousel"
                      />
                    ))}
                  </CategoryCarousel>
                </section>
              ))
            ) : (
              <CategoryCarousel label={activeCategory}>
                {filteredMenu.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    qty={cart[item.id] || 0}
                    update={update}
                    variant="carousel"
                  />
                ))}
              </CategoryCarousel>
            )}
          </div>

          <AboutTeaser onOpenStory={() => setShowAbout(true)} />

          <div className="max-w-xl mx-auto">
            <EventForm
              formRef={formRef}
              info={info}
              errors={errors}
              onChange={setInfo}
              onClearError={(field) => setErrors((prev) => ({ ...prev, [field]: false }))}
            />
          </div>
        </div>

        <CartBar
          subtotal={subtotal}
          cartItems={items}
          showReview={reviewOpen}
          selectedForDelete={selectedForDelete}
          checkoutError={checkoutError}
          onToggleReview={() =>
            setShowCartReview((prev) => {
              if (prev) setSelectedForDelete(new Set());
              return !prev;
            })
          }
          onCloseReview={() => {
            setShowCartReview(false);
            setSelectedForDelete(new Set());
          }}
          onToggleSelect={(id) => {
            setSelectedForDelete((prev) => {
              const next = new Set(prev);
              if (next.has(id)) next.delete(id);
              else next.add(id);
              return next;
            });
          }}
          onSelectAll={() => setSelectedForDelete(new Set(items.map((item) => item.id)))}
          onDeleteSelected={() => {
            if (selectedForDelete.size === 0) return;
            setCart((prev) => {
              const next = { ...prev };
              selectedForDelete.forEach((id) => delete next[id]);
              return next;
            });
            setSelectedForDelete(new Set());
            setShowCartReview(false);
            setCheckoutError(null);
          }}
          onUpdateQty={update}
          onGenerateQuote={generateQuote}
          onSendOrder={send}
        />
      </div>
    </main>
  );
}
