function accordion_faq() {
  /* Accordion FAQ */
  if ($('.faq-area').length > 0) {
    $('.accordion-faq-title').on('click', function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active')
        $(this).siblings('.accordion-faq-content').slideUp(200)
      } else {
        $(this)
        $('.accordion-faq-title').removeClass('active')
        $(this).addClass('active')
        $('.accordion-faq-content').slideUp(200)
        $(this).siblings('.accordion-faq-content').slideDown(200)
      }
    })
  }
  /* Accordion FAQ End */
}
$(document).ready(function () {
  accordion_faq()
})
