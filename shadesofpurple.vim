function! crystalline#theme#shadesofpurple#set_theme() abort
  call crystalline#generate_theme({
        \ 'NormalMode':  [[255, 89], ['#EEEEEE', '#1C1C1C']],
        \ 'InsertMode':  [[255, 196],  ['#1C1C1C', '#00FF00']],
        \ 'VisualMode':  [[234, 177], ['#1C1C1C', '#c991ff']],
        \ 'ReplaceMode': [[234, 204], ['#1C1C1C', '#FF628C']],
        \ '':            [[234, 255], ['#1C1C1C', '#EEEEEE']],
        \ 'Inactive':    [[234, 255], ['#1C1C1C', '#EEEEEE']],
        \ 'Fill':        [[255, 234], ['#EEEEEE', '#1C1C1C']],
        \ 'Tab':         [[234, 255], ['#1C1C1C', '#EEEEEE']],
        \ 'TabType':     [[234, 255], ['#1C1C1C', '#EEEEEE']],
        \ 'TabSel':      [[234, 226], ['#1C1C1C', '#FAD000']],
        \ 'TabFill':     [[255, 234], ['#EEEEEE', '#1C1C1C']],
        \ })
endfunction

" vim:set et sw=2 ts=2 fdm=marker:

