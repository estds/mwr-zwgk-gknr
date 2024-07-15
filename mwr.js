// ==UserScript==
// @name         屏蔽MWR政务公开滚动条
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  去除没有必要的滚动条，添加打印样式便于打印。
// @match        http://www.mwr.gov.cn/zwgk/gknr*
// @match        https://www.mwr.gov.cn/zwgk/gknr*
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Function to destroy mCustomScrollbar
    function destroyScrollbar() {
        if (typeof $ !== 'undefined' && $.fn.mCustomScrollbar) {
            $(".scroll").mCustomScrollbar('destroy');
            //console.log('Destroyed mCustomScrollbar on .scroll elements');
        } else {
            //console.log('jQuery or mCustomScrollbar not available');
        }
    }

    // Function to modify .roll and .gknb elements
    function modifyElements() {
        const elementsToModify = document.querySelectorAll('.roll, .gknb');
        elementsToModify.forEach(element => {
            element.style.setProperty('height', 'auto', 'important');
        });
        //console.log('Modified .roll and .gknb elements');
    }

    // Function to add print styles
    function addPrintStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @media print {
                body > .banner,
                body > .center_block.word,
                body > .section .left,
                body > .center_block .search,
                body > div[align="center"] {
                    display: none;
                }
                body > .section,
                body > .section .content,
                body > .section .right,
                body > .section .right .roll {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
        //console.log('Added print styles');
    }

    // Run the functions when the page is ready
    function onPageReady() {
        destroyScrollbar();
        modifyElements();
        addPrintStyles();
    }

    // Check if jQuery is already available
    if (typeof $ !== 'undefined') {
        $(document).ready(onPageReady);
    } else {
        // If jQuery is not available, wait for it to load
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof $ !== 'undefined') {
                onPageReady();
            } else {
                console.log('jQuery not found');
            }
        });
    }
})();
