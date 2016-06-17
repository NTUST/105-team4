#-*- coding: utf-8 -*-
import requests
import json
from bs4 import BeautifulSoup

def fix(string):
	return string.replace(" ", "").replace("\n", "").replace("\r", "").replace("\t", "")

zodiac = ['白羊座', '金牛座', '雙子座', '巨蟹座', '獅子座', '處女座', '天秤座', '天蝎座' ,'射手座' ,'摩羯座' ,'水瓶座' ,'雙魚座']
zodiacEnglish = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ,'i' ,'j' ,'k' ,'l']
dic = {}

url = 'http://fate.ximizi.com/peidui_aiqing.php'

for bIndex, B in enumerate(zodiac):
	for gIndex, G in enumerate(zodiac):
		print zodiacEnglish[bIndex] + zodiacEnglish[gIndex]
		url = 'http://fate.ximizi.com/peidui_aiqing.php'
		response = requests.post(url, data = { 'B': B, 'G': G })
		html = response.content
		soup = BeautifulSoup(html, 'html.parser')
		content = ''
		for pIndex, p in enumerate(soup.findAll('p')):
			if pIndex in(7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17):
				if fix(p.text) != '':
					content += fix(p.text)
		dic[zodiacEnglish[bIndex] + zodiacEnglish[gIndex]] = content
print 'finished'
print json.dumps(dic)
