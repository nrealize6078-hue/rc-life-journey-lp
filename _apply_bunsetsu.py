# -*- coding: utf-8 -*-
"""見出し・本文のテキストを文節タグ <w-b> で包む（再実行すると貼り直す）

span を使うと既存の子孫セレクタに巻き込まれるため、
どのCSSにも一致しない専用のカスタム要素を使う。
"""
import re, sys
from bs4 import BeautifulSoup
sys.path.insert(0, '.')
from _bunsetsu import split_bunsetsu

TAG = 'w-b'
TARGET = 'h1,h2,h3,h4,p,summary,strong,b,em,li,dd,dt,figcaption'
SKIP_PARENT = {'a', 'script', 'style', 'button', 'title'}
SKIP_CLASS = {'bar-long', 'bar-short', 'eyebrow', 'section-kicker',
              'light-kicker', 'hero-note', 'photo-caption', 'scroll-label'}
JA = re.compile(r'[぀-ヿ一-鿿]')

def has_skip_ancestor(node):
    for par in node.parents:
        if par.name in SKIP_PARENT:
            return True
        if set(par.get('class') or []) & SKIP_CLASS:
            return True
    return False

def main():
    soup = BeautifulSoup(open('index.html', encoding='utf-8').read(), 'html.parser')
    removed = 0
    for old in soup.find_all(TAG):
        old.unwrap(); removed += 1
    soup.smooth()

    wrapped = 0
    for el in soup.select(TARGET):
        for node in list(el.find_all(string=True)):
            text = str(node)
            if not JA.search(text) or not text.strip() or has_skip_ancestor(node):
                continue
            # p と strong の両方が TARGET なので、同じテキストが二度包まれるのを防ぐ
            if node.find_parent(TAG) is not None:
                continue
            stripped = text.strip()
            segs = split_bunsetsu(stripped)
            if len(segs) <= 1:
                # 分割できない短い一文は、丸ごと1単位にして語中改行を防ぐ。
                # （このLPはスマホで <br> を display:none にするため、
                #   <br> で分けたはずの一文がつながって流れて割れる）
                # 長い文まで包むと overflow-wrap が禁則を無視して割るので短いものだけ。
                if not (2 <= len(stripped) <= 14):
                    continue
                segs = [stripped]
            lead = text[:len(text) - len(text.lstrip())]
            tail = text[len(text.rstrip()):]
            frag = lead + ''.join(f'<{TAG}>{s}</{TAG}>' for s in segs) + tail
            node.replace_with(BeautifulSoup(frag, 'html.parser'))
            wrapped += 1
    open('index.html', 'w', encoding='utf-8', newline='\n').write(str(soup))
    print(f'古いタグ{removed}個を剥がし、{wrapped}箇所を文節に分割しました')

main()
