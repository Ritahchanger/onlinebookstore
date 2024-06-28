from django.http import HttpResponse, JsonResponse 
from django.views.decorators.csrf import csrf_exempt 
from rest_framework.parsers import JSONParser 

from transformers.models import Transformer 
from transformers.serializers import TransformerSerializer 

@csrf_exempt
def transformer_list(request): 
	""" 
	List all transformers, or create a new transformer 
	"""
	if request.method == 'GET': 
		transformer = Transformer.objects.all() 
		serializer = TransformerSerializer(transformer, many=True) 
		return JsonResponse(serializer.data, safe=False) 

	elif request.method == 'POST': 
		data = JSONParser().parse(request) 
		serializer = TransformerSerializer(data=data) 
		if serializer.is_valid(): 
			serializer.save() 
			return JsonResponse(serializer.data, status=201) 
		return JsonResponse(serializer.errors, status=400) 

@csrf_exempt
def transformer_detail(request, pk): 
	try: 
		transformer = Transformer.objects.get(pk=pk) 
	except Transformer.DoesNotExist: 
		return HttpResponse(status=404) 

	if request.method == 'GET': 
		serializer = TransformerSerializer(transformer) 
		return JsonResponse(serializer.data) 

	elif request.method == 'PUT': 
		data = JSONParser().parse(request) 
		serializer = TransformerSerializer(transformer, data=data) 

		if serializer.is_valid(): 
			serializer.save() 
			return JsonResponse(serializer.data) 
		return JsonResponse(serializer.errors, status=400) 

	elif request.method == 'DELETE': 
		transformer.delete() 
		return HttpResponse(status=204) 
