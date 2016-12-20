<!-- Slider main container -->
<div class="swiper-container">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    {{~ it.list:item:index}}
    <div class="swiper-slide" style="background-image: url('{{= item.url}}')" data-url="{{=item.link}}"></div>
    {{~}}
  </div>
  <div class="circle-list"></div>
</div>