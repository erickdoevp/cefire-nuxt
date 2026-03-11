<template>
  <!-- ─── CTA ───────────────────────────────────────────────────── -->
  <section class="bg-[#466bc2] py-20">
    <UContainer class="flex flex-col items-center gap-8">
      <h2 class="text-[44px] font-bold text-white text-center tracking-[-0.5px]">
        ¿Estás listo para comenzar tu recuperación?
      </h2>
      <p class="max-w-[600px] text-center text-[18px] text-white/80 leading-[1.6]">
        Reserva tu valoración gratuita hoy mismo. No necesitas referencia ni compromiso.
        Da el primer paso para vivir sin dolor.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UButton
          target="_blank"
          to="https://wa.me/522461370462?text=Hola%20quiero%20más%20información"
          rel="noopener noreferrer"
          size="xl"
          class="rounded-xl bg-white text-primary font-semibold text-[17px] px-9 py-[18px] hover:bg-gray-100 transition-colors"
        >
          Reserva una valoración gratuita
        </UButton>
        <UButton
          to="tel:+522461370462"
          size="xl"
          variant="outline"
          class="rounded-xl border border-white/40 text-white font-semibold text-[17px] px-9 py-[18px] bg-transparent hover:bg-white/10 transition-colors"
        >
          Llamanos (246) 137 0462
        </UButton>
      </div>
      <p class="text-[14px] font-medium text-white/60">
       Consulta telefónica gratuita de 15 minutos &nbsp;•&nbsp; Citas en la misma semana &nbsp;•&nbsp; Se aceptan la mayoría de los seguros
      </p>
    </UContainer>
  </section>
</template>