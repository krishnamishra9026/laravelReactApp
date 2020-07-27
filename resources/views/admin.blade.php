<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta name="csrf-token" content="{{ csrf_token() }}">
	
	@include('layouts.back-head')
</head>
<body class="ms-body ms-aside-left-open ms-primary-theme ">
<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
	@csrf
</form>

<script>
	var user_id = "<?php echo json_encode(Auth::user()->id); ?>";
</script>
<div id="admin-app"></div>
<script type="text/javascript" src="{{asset('js/app.js')}}"></script>
</body>
</html>

