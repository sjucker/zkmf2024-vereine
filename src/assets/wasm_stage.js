let R=0,Y=`string`,T=1,Z=`Object`,P=`utf-8`,N=null,W=`number`,O=`undefined`,X=`boolean`,a0=4,U=`function`,a1=710,$=16,L=Array,Q=Error,_=FinalizationRegistry,V=Int32Array,S=Uint8Array,M=undefined;var F=(async(a,b)=>{if(typeof Response===U&&a instanceof Response){if(typeof WebAssembly.instantiateStreaming===U){try{return await WebAssembly.instantiateStreaming(a,b)}catch(b){if(a.headers.get(`Content-Type`)!=`application/wasm`){console.warn(`\`WebAssembly.instantiateStreaming\` failed because your server does not serve wasm with \`application/wasm\` MIME type. Falling back to \`WebAssembly.instantiate\` which is slower. Original error:\\n`,b)}else{throw b}}};const c=await a.arrayBuffer();return await WebAssembly.instantiate(c,b)}else{const c=await WebAssembly.instantiate(a,b);if(c instanceof WebAssembly.Instance){return {instance:c,module:a}}else{return c}}});var u=(a=>{const b=typeof a;if(b==W||b==X||a==N){return `${a}`};if(b==Y){return `"${a}"`};if(b==`symbol`){const b=a.description;if(b==N){return `Symbol`}else{return `Symbol(${b})`}};if(b==U){const b=a.name;if(typeof b==Y&&b.length>R){return `Function(${b})`}else{return `Function`}};if(L.isArray(a)){const b=a.length;let c=`[`;if(b>R){c+=u(a[R])};for(let d=T;d<b;d++){c+=`, `+ u(a[d])};c+=`]`;return c};const c=/\[object ([^\]]+)\]/.exec(toString.call(a));let d;if(c.length>T){d=c[T]}else{return toString.call(a)};if(d==Z){try{return `Object(`+ JSON.stringify(a)+ `)`}catch(a){return Z}};if(a instanceof Q){return `${a.name}: ${a.message}\n${a.stack}`};return d});var x=((b,c,d)=>{a._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h6f97e0ce090497f2(b,c,k(d))});var H=((a,b)=>{});var z=((b,c)=>{a._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hab2315073976a1d4(b,c)});var k=(a=>{if(d===b.length)b.push(b.length+ T);const c=d;d=b[c];b[c]=a;return c});var f=(a=>{const b=c(a);e(a);return b});function E(b,c){try{return b.apply(this,c)}catch(b){a.__wbindgen_exn_store(k(b))}}var K=(async(b)=>{if(a!==M)return a;if(typeof b===O){b=new URL(`stager-3ab7e46af3d2a755_bg.wasm`,import.meta.url)};const c=G();if(typeof b===Y||typeof Request===U&&b instanceof Request||typeof URL===U&&b instanceof URL){b=fetch(b)};H(c);const {instance:d,module:e}=await F(await b,c);return I(d,e)});var r=(()=>{if(q===N||q.byteLength===R){q=new V(a.memory.buffer)};return q});var p=(a=>a===M||a===N);var c=(a=>b[a]);var J=(b=>{if(a!==M)return a;const c=G();H(c);if(!(b instanceof WebAssembly.Module)){b=new WebAssembly.Module(b)};const d=new WebAssembly.Instance(b,c);return I(d,b)});var G=(()=>{const b={};b.wbg={};b.wbg.__wbindgen_object_drop_ref=(a=>{f(a)});b.wbg.__wbindgen_cb_drop=(a=>{const b=f(a).original;if(b.cnt--==T){b.a=R;return !0};const c=!1;return c});b.wbg.__wbindgen_string_new=((a,b)=>{const c=j(a,b);return k(c)});b.wbg.__wbindgen_string_get=((b,d)=>{const e=c(d);const f=typeof e===Y?e:M;var g=p(f)?R:o(f,a.__wbindgen_malloc,a.__wbindgen_realloc);var h=l;r()[b/a0+ T]=h;r()[b/a0+ R]=g});b.wbg.__wbindgen_object_clone_ref=(a=>{const b=c(a);return k(b)});b.wbg.__wbg_warn_9f342193aba78ade=((a,b)=>{console.warn(j(a,b))});b.wbg.__wbg_info_5f81499bedfbb5bc=((a,b)=>{console.info(j(a,b))});b.wbg.__wbg_debug_3f054bbe0f3dac7b=((a,b)=>{console.debug(j(a,b))});b.wbg.__wbg_trace_a77d5b4727abe1a2=((a,b)=>{console.trace(j(a,b))});b.wbg.__wbindgen_number_get=((a,b)=>{const d=c(b);const e=typeof d===W?d:M;t()[a/8+ T]=p(e)?R:e;r()[a/a0+ R]=!p(e)});b.wbg.__wbg_error_fef71bc9b670aec4=((b,c)=>{let d;let e;try{d=b;e=c;console.error(j(b,c))}finally{a.__wbindgen_free(d,e,T)}});b.wbg.__wbg_new_17c866ad40da987b=(()=>{const a=new Q();return k(a)});b.wbg.__wbg_stack_1c1cef4675b9e0ca=((b,d)=>{const e=c(d).stack;const f=o(e,a.__wbindgen_malloc,a.__wbindgen_realloc);const g=l;r()[b/a0+ T]=g;r()[b/a0+ R]=f});b.wbg.__wbg_queueMicrotask_f61ee94ee663068b=(a=>{queueMicrotask(c(a))});b.wbg.__wbg_queueMicrotask_f82fc5d1e8f816ae=(a=>{const b=c(a).queueMicrotask;return k(b)});b.wbg.__wbindgen_is_function=(a=>{const b=typeof c(a)===U;return b});b.wbg.__wbg_performance_bdf4f1a290fc5c5c=(a=>{const b=c(a).performance;return k(b)});b.wbg.__wbindgen_is_undefined=(a=>{const b=c(a)===M;return b});b.wbg.__wbg_now_d87295c25be68e8b=(a=>{const b=c(a).now();return b});b.wbg.__wbindgen_boolean_get=(a=>{const b=c(a);const d=typeof b===X?(b?T:R):2;return d});b.wbg.__wbg_instanceof_WebGl2RenderingContext_dcef4c962fd699e9=(a=>{let b;try{b=c(a) instanceof WebGL2RenderingContext}catch(a){b=!1}const d=b;return d});b.wbg.__wbg_bindVertexArray_cf524b9892e28075=((a,b)=>{c(a).bindVertexArray(c(b))});b.wbg.__wbg_bufferData_cbf46e29ed1643f0=((a,b,d,e)=>{c(a).bufferData(b>>>R,c(d),e>>>R)});b.wbg.__wbg_createVertexArray_4b35fb59f7da9bd3=(a=>{const b=c(a).createVertexArray();return p(b)?R:k(b)});b.wbg.__wbg_texImage2D_34d2f7ba311010e4=function(){return E(((a,b,d,e,f,g,h,i,j,k)=>{c(a).texImage2D(b>>>R,d,e,f,g,h,i>>>R,j>>>R,c(k))}),arguments)};b.wbg.__wbg_texSubImage2D_be1edbc37b17c97c=function(){return E(((a,b,d,e,f,g,h,i,j,k)=>{c(a).texSubImage2D(b>>>R,d,e,f,g,h,i>>>R,j>>>R,c(k))}),arguments)};b.wbg.__wbg_texSubImage2D_2d448f50a6536ac3=function(){return E(((a,b,d,e,f,g,h,i,j,k)=>{c(a).texSubImage2D(b>>>R,d,e,f,g,h,i>>>R,j>>>R,k)}),arguments)};b.wbg.__wbg_activeTexture_5a67b794a7ff8ef9=((a,b)=>{c(a).activeTexture(b>>>R)});b.wbg.__wbg_attachShader_06c432ad16c8823a=((a,b,d)=>{c(a).attachShader(c(b),c(d))});b.wbg.__wbg_bindBuffer_c0ef32bca575b1bf=((a,b,d)=>{c(a).bindBuffer(b>>>R,c(d))});b.wbg.__wbg_bindTexture_b93b09b8ccb1ad79=((a,b,d)=>{c(a).bindTexture(b>>>R,c(d))});b.wbg.__wbg_blendEquationSeparate_15c450dcb532d4b6=((a,b,d)=>{c(a).blendEquationSeparate(b>>>R,d>>>R)});b.wbg.__wbg_blendFuncSeparate_1b0a9589131ac4ec=((a,b,d,e,f)=>{c(a).blendFuncSeparate(b>>>R,d>>>R,e>>>R,f>>>R)});b.wbg.__wbg_clear_7f98b4d14a417e94=((a,b)=>{c(a).clear(b>>>R)});b.wbg.__wbg_clearColor_d0e4ba6b3de36fbc=((a,b,d,e,f)=>{c(a).clearColor(b,d,e,f)});b.wbg.__wbg_colorMask_bce35700ad725680=((a,b,d,e,f)=>{c(a).colorMask(b!==R,d!==R,e!==R,f!==R)});b.wbg.__wbg_compileShader_81181e6a219b7098=((a,b)=>{c(a).compileShader(c(b))});b.wbg.__wbg_createBuffer_6ead16b08a511599=(a=>{const b=c(a).createBuffer();return p(b)?R:k(b)});b.wbg.__wbg_createProgram_c835e8e8ff672d87=(a=>{const b=c(a).createProgram();return p(b)?R:k(b)});b.wbg.__wbg_createShader_ae014363ffc75c3a=((a,b)=>{const d=c(a).createShader(b>>>R);return p(d)?R:k(d)});b.wbg.__wbg_createTexture_bf3e90c90068415a=(a=>{const b=c(a).createTexture();return p(b)?R:k(b)});b.wbg.__wbg_deleteBuffer_dd6dab889155f66c=((a,b)=>{c(a).deleteBuffer(c(b))});b.wbg.__wbg_deleteProgram_fa4467f1f5240581=((a,b)=>{c(a).deleteProgram(c(b))});b.wbg.__wbg_deleteShader_1763981bc55a576a=((a,b)=>{c(a).deleteShader(c(b))});b.wbg.__wbg_deleteTexture_767a200bf1091c20=((a,b)=>{c(a).deleteTexture(c(b))});b.wbg.__wbg_detachShader_fc9a9cb8acd1feef=((a,b,d)=>{c(a).detachShader(c(b),c(d))});b.wbg.__wbg_disable_7c1d698fcc9ac41f=((a,b)=>{c(a).disable(b>>>R)});b.wbg.__wbg_disableVertexAttribArray_eb9b9b0042076ad2=((a,b)=>{c(a).disableVertexAttribArray(b>>>R)});b.wbg.__wbg_drawElements_510ac32d8abfd683=((a,b,d,e,f)=>{c(a).drawElements(b>>>R,d,e>>>R,f)});b.wbg.__wbg_enable_fb591cc986e74bb0=((a,b)=>{c(a).enable(b>>>R)});b.wbg.__wbg_enableVertexAttribArray_224e3bb561570cc2=((a,b)=>{c(a).enableVertexAttribArray(b>>>R)});b.wbg.__wbg_getAttribLocation_6c42e2cd1c2847f2=((a,b,d,e)=>{const f=c(a).getAttribLocation(c(b),j(d,e));return f});b.wbg.__wbg_getError_54d0953dc572e9d3=(a=>{const b=c(a).getError();return b});b.wbg.__wbg_getExtension_9167625a19377c9e=function(){return E(((a,b,d)=>{const e=c(a).getExtension(j(b,d));return p(e)?R:k(e)}),arguments)};b.wbg.__wbg_getParameter_f9803d52fbf91f53=function(){return E(((a,b)=>{const d=c(a).getParameter(b>>>R);return k(d)}),arguments)};b.wbg.__wbg_getProgramInfoLog_056131faf2350ad7=((b,d,e)=>{const f=c(d).getProgramInfoLog(c(e));var g=p(f)?R:o(f,a.__wbindgen_malloc,a.__wbindgen_realloc);var h=l;r()[b/a0+ T]=h;r()[b/a0+ R]=g});b.wbg.__wbg_getProgramParameter_790db16915da3254=((a,b,d)=>{const e=c(a).getProgramParameter(c(b),d>>>R);return k(e)});b.wbg.__wbg_getShaderInfoLog_20c948f5d991e6fd=((b,d,e)=>{const f=c(d).getShaderInfoLog(c(e));var g=p(f)?R:o(f,a.__wbindgen_malloc,a.__wbindgen_realloc);var h=l;r()[b/a0+ T]=h;r()[b/a0+ R]=g});b.wbg.__wbg_getShaderParameter_37b950cbc20b6795=((a,b,d)=>{const e=c(a).getShaderParameter(c(b),d>>>R);return k(e)});b.wbg.__wbg_getSupportedExtensions_0025d1c62129a18d=(a=>{const b=c(a).getSupportedExtensions();return p(b)?R:k(b)});b.wbg.__wbg_getUniformLocation_a7c602314cbc2c05=((a,b,d,e)=>{const f=c(a).getUniformLocation(c(b),j(d,e));return p(f)?R:k(f)});b.wbg.__wbg_linkProgram_bc5dc3f9357619ca=((a,b)=>{c(a).linkProgram(c(b))});b.wbg.__wbg_pixelStorei_d72d429580d66228=((a,b,d)=>{c(a).pixelStorei(b>>>R,d)});b.wbg.__wbg_scissor_ba4f49872ea487b7=((a,b,d,e,f)=>{c(a).scissor(b,d,e,f)});b.wbg.__wbg_shaderSource_928e12db21ccefe3=((a,b,d,e)=>{c(a).shaderSource(c(b),j(d,e))});b.wbg.__wbg_texParameteri_7258cda4d4572982=((a,b,d,e)=>{c(a).texParameteri(b>>>R,d>>>R,e)});b.wbg.__wbg_uniform1i_f13bd7d6ad492b5a=((a,b,d)=>{c(a).uniform1i(c(b),d)});b.wbg.__wbg_uniform2f_3654c72e821a2089=((a,b,d,e)=>{c(a).uniform2f(c(b),d,e)});b.wbg.__wbg_useProgram_fcb92641d4c3215f=((a,b)=>{c(a).useProgram(c(b))});b.wbg.__wbg_vertexAttribPointer_0959b49dbd9a1b3e=((a,b,d,e,f,g,h)=>{c(a).vertexAttribPointer(b>>>R,d,e>>>R,f!==R,g,h)});b.wbg.__wbg_viewport_8fc784fc0658898b=((a,b,d,e,f)=>{c(a).viewport(b,d,e,f)});b.wbg.__wbg_instanceof_Window_cde2416cf5126a72=(a=>{let b;try{b=c(a) instanceof Window}catch(a){b=!1}const d=b;return d});b.wbg.__wbg_document_183cf1eecfdbffee=(a=>{const b=c(a).document;return p(b)?R:k(b)});b.wbg.__wbg_location_61ca61017633c753=(a=>{const b=c(a).location;return k(b)});b.wbg.__wbg_navigator_7078da62d92ff5ad=(a=>{const b=c(a).navigator;return k(b)});b.wbg.__wbg_innerHeight_dc90993c8fc10005=function(){return E((a=>{const b=c(a).innerHeight;return k(b)}),arguments)};b.wbg.__wbg_devicePixelRatio_41f7bf915854e871=(a=>{const b=c(a).devicePixelRatio;return b});b.wbg.__wbg_localStorage_e11f72e996a4f5d9=function(){return E((a=>{const b=c(a).localStorage;return p(b)?R:k(b)}),arguments)};b.wbg.__wbg_performance_73760908744b00c4=(a=>{const b=c(a).performance;return p(b)?R:k(b)});b.wbg.__wbg_matchMedia_dd5eeb8cc5ff75ca=function(){return E(((a,b,d)=>{const e=c(a).matchMedia(j(b,d));return p(e)?R:k(e)}),arguments)};b.wbg.__wbg_open_d3d452ff648d3681=function(){return E(((a,b,d,e,f)=>{const g=c(a).open(j(b,d),j(e,f));return p(g)?R:k(g)}),arguments)};b.wbg.__wbg_requestAnimationFrame_244e975fcad8e9a1=function(){return E(((a,b)=>{const d=c(a).requestAnimationFrame(c(b));return d}),arguments)};b.wbg.__wbg_clearInterval_81f83f51e731793f=((a,b)=>{c(a).clearInterval(b)});b.wbg.__wbg_setTimeout_07866af1a1842093=function(){return E(((a,b,d)=>{const e=c(a).setTimeout(c(b),d);return e}),arguments)};b.wbg.__wbg_body_11da0c1aa9610cb3=(a=>{const b=c(a).body;return p(b)?R:k(b)});b.wbg.__wbg_createElement_9ce3fdea8322ff34=function(){return E(((a,b,d)=>{const e=c(a).createElement(j(b,d));return k(e)}),arguments)};b.wbg.__wbg_getElementById_328f8c4a5bb51ba8=((a,b,d)=>{const e=c(a).getElementById(j(b,d));return p(e)?R:k(e)});b.wbg.__wbg_setid_fe7d3f00faee9503=((a,b,d)=>{c(a).id=j(b,d)});b.wbg.__wbg_scrollLeft_bbfdbdde94b3819a=(a=>{const b=c(a).scrollLeft;return b});b.wbg.__wbg_clientWidth_15a0b51999d4f454=(a=>{const b=c(a).clientWidth;return b});b.wbg.__wbg_clientHeight_d1f0d14dadbdbebb=(a=>{const b=c(a).clientHeight;return b});b.wbg.__wbg_getBoundingClientRect_0d74d25dcac14a05=(a=>{const b=c(a).getBoundingClientRect();return k(b)});b.wbg.__wbg_scrollTop_45fd63a40d383efa=(a=>{const b=c(a).scrollTop;return b});b.wbg.__wbg_hidden_0b893241c11ceebc=(a=>{const b=c(a).hidden;return b});b.wbg.__wbg_sethidden_0ffb1659c60656e2=((a,b)=>{c(a).hidden=b!==R});b.wbg.__wbg_style_bb2563875c0a818b=(a=>{const b=c(a).style;return k(b)});b.wbg.__wbg_offsetTop_d7e420b2673fb71a=(a=>{const b=c(a).offsetTop;return b});b.wbg.__wbg_offsetLeft_9359c73755edb729=(a=>{const b=c(a).offsetLeft;return b});b.wbg.__wbg_offsetWidth_cef737f878d51133=(a=>{const b=c(a).offsetWidth;return b});b.wbg.__wbg_blur_38e4aafa977ce401=function(){return E((a=>{c(a).blur()}),arguments)};b.wbg.__wbg_focus_bab0841297cb9142=function(){return E((a=>{c(a).focus()}),arguments)};b.wbg.__wbg_instanceof_WebGlRenderingContext_7ff8d8adfb8c0fb3=(a=>{let b;try{b=c(a) instanceof WebGLRenderingContext}catch(a){b=!1}const d=b;return d});b.wbg.__wbg_bufferData_2070fa76f6302a3a=((a,b,d,e)=>{c(a).bufferData(b>>>R,c(d),e>>>R)});b.wbg.__wbg_texImage2D_cef3c6006af52777=function(){return E(((a,b,d,e,f,g,h,i,j,k)=>{c(a).texImage2D(b>>>R,d,e,f,g,h,i>>>R,j>>>R,c(k))}),arguments)};b.wbg.__wbg_texSubImage2D_5fb421f096442197=function(){return E(((a,b,d,e,f,g,h,i,j,k)=>{c(a).texSubImage2D(b>>>R,d,e,f,g,h,i>>>R,j>>>R,c(k))}),arguments)};b.wbg.__wbg_activeTexture_3133544378a42f85=((a,b)=>{c(a).activeTexture(b>>>R)});b.wbg.__wbg_attachShader_5f2b830f85fe5214=((a,b,d)=>{c(a).attachShader(c(b),c(d))});b.wbg.__wbg_bindBuffer_f5494dced2da6816=((a,b,d)=>{c(a).bindBuffer(b>>>R,c(d))});b.wbg.__wbg_bindTexture_b65e04a9a41089c5=((a,b,d)=>{c(a).bindTexture(b>>>R,c(d))});b.wbg.__wbg_blendEquationSeparate_24eecf7601450fe7=((a,b,d)=>{c(a).blendEquationSeparate(b>>>R,d>>>R)});b.wbg.__wbg_blendFuncSeparate_5b5fee01a93374c8=((a,b,d,e,f)=>{c(a).blendFuncSeparate(b>>>R,d>>>R,e>>>R,f>>>R)});b.wbg.__wbg_clear_cdb6757c4784affb=((a,b)=>{c(a).clear(b>>>R)});b.wbg.__wbg_clearColor_0278b0551b3e7d28=((a,b,d,e,f)=>{c(a).clearColor(b,d,e,f)});b.wbg.__wbg_colorMask_0376e32b78af65ed=((a,b,d,e,f)=>{c(a).colorMask(b!==R,d!==R,e!==R,f!==R)});b.wbg.__wbg_compileShader_b67e96b6423b77f6=((a,b)=>{c(a).compileShader(c(b))});b.wbg.__wbg_createBuffer_021d77b738829b0a=(a=>{const b=c(a).createBuffer();return p(b)?R:k(b)});b.wbg.__wbg_createProgram_157eefe7131da099=(a=>{const b=c(a).createProgram();return p(b)?R:k(b)});b.wbg.__wbg_createShader_a248274c77c19763=((a,b)=>{const d=c(a).createShader(b>>>R);return p(d)?R:k(d)});b.wbg.__wbg_createTexture_d7064762f0a65367=(a=>{const b=c(a).createTexture();return p(b)?R:k(b)});b.wbg.__wbg_deleteBuffer_08659fcc166ac49c=((a,b)=>{c(a).deleteBuffer(c(b))});b.wbg.__wbg_deleteProgram_911f2e7223030fb4=((a,b)=>{c(a).deleteProgram(c(b))});b.wbg.__wbg_deleteShader_c58d400272a58a2c=((a,b)=>{c(a).deleteShader(c(b))});b.wbg.__wbg_deleteTexture_18c5c1f49778a77f=((a,b)=>{c(a).deleteTexture(c(b))});b.wbg.__wbg_detachShader_d8cba348b867050c=((a,b,d)=>{c(a).detachShader(c(b),c(d))});b.wbg.__wbg_disable_0469cc57066f58ac=((a,b)=>{c(a).disable(b>>>R)});b.wbg.__wbg_disableVertexAttribArray_c85182ad3bd570d0=((a,b)=>{c(a).disableVertexAttribArray(b>>>R)});b.wbg.__wbg_drawElements_74abca35806a62bd=((a,b,d,e,f)=>{c(a).drawElements(b>>>R,d,e>>>R,f)});b.wbg.__wbg_enable_0a908e612a142cce=((a,b)=>{c(a).enable(b>>>R)});b.wbg.__wbg_enableVertexAttribArray_7e6345ac810e2ea4=((a,b)=>{c(a).enableVertexAttribArray(b>>>R)});b.wbg.__wbg_getAttribLocation_f215c5d8469fbd93=((a,b,d,e)=>{const f=c(a).getAttribLocation(c(b),j(d,e));return f});b.wbg.__wbg_getError_6d32fee40716377b=(a=>{const b=c(a).getError();return b});b.wbg.__wbg_getExtension_4d6bc63c721ceeae=function(){return E(((a,b,d)=>{const e=c(a).getExtension(j(b,d));return p(e)?R:k(e)}),arguments)};b.wbg.__wbg_getParameter_3de02d06ae9c1133=function(){return E(((a,b)=>{const d=c(a).getParameter(b>>>R);return k(d)}),arguments)};b.wbg.__wbg_getProgramInfoLog_650791ed1218ae54=((b,d,e)=>{const f=c(d).getProgramInfoLog(c(e));var g=p(f)?R:o(f,a.__wbindgen_malloc,a.__wbindgen_realloc);var h=l;r()[b/a0+ T]=h;r()[b/a0+ R]=g});b.wbg.__wbg_getProgramParameter_529c4bcf8c4ee18e=((a,b,d)=>{const e=c(a).getProgramParameter(c(b),d>>>R);return k(e)});b.wbg.__wbg_getShaderInfoLog_58a82681a9c442e7=((b,d,e)=>{const f=c(d).getShaderInfoLog(c(e));var g=p(f)?R:o(f,a.__wbindgen_malloc,a.__wbindgen_realloc);var h=l;r()[b/a0+ T]=h;r()[b/a0+ R]=g});b.wbg.__wbg_getShaderParameter_c1610eb33511085e=((a,b,d)=>{const e=c(a).getShaderParameter(c(b),d>>>R);return k(e)});b.wbg.__wbg_getSupportedExtensions_087412bf60ddcd3d=(a=>{const b=c(a).getSupportedExtensions();return p(b)?R:k(b)});b.wbg.__wbg_getUniformLocation_2c91af6518876e42=((a,b,d,e)=>{const f=c(a).getUniformLocation(c(b),j(d,e));return p(f)?R:k(f)});b.wbg.__wbg_linkProgram_83243a6b6a0c9fb4=((a,b)=>{c(a).linkProgram(c(b))});b.wbg.__wbg_pixelStorei_4efa23d93154f77d=((a,b,d)=>{c(a).pixelStorei(b>>>R,d)});b.wbg.__wbg_scissor_d3671d6dc45f6c26=((a,b,d,e,f)=>{c(a).scissor(b,d,e,f)});b.wbg.__wbg_shaderSource_f7a361c4354dbdf4=((a,b,d,e)=>{c(a).shaderSource(c(b),j(d,e))});b.wbg.__wbg_texParameteri_b4d0b459f1fba172=((a,b,d,e)=>{c(a).texParameteri(b>>>R,d>>>R,e)});b.wbg.__wbg_uniform1i_73819b7968ac4e58=((a,b,d)=>{c(a).uniform1i(c(b),d)});b.wbg.__wbg_uniform2f_9b35142dca8ca665=((a,b,d,e)=>{c(a).uniform2f(c(b),d,e)});b.wbg.__wbg_useProgram_521dfe9012fd77d6=((a,b)=>{c(a).useProgram(c(b))});b.wbg.__wbg_vertexAttribPointer_04346476271a47a3=((a,b,d,e,f,g,h)=>{c(a).vertexAttribPointer(b>>>R,d,e>>>R,f!==R,g,h)});b.wbg.__wbg_viewport_4bd44b9c38348e9c=((a,b,d,e,f)=>{c(a).viewport(b,d,e,f)});b.wbg.__wbg_instanceof_HtmlInputElement_8f81a6600ceb1918=(a=>{let b;try{b=c(a) instanceof HTMLInputElement}catch(a){b=!1}const d=b;return d});b.wbg.__wbg_setautofocus_7a260286d040af30=((a,b)=>{c(a).autofocus=b!==R});b.wbg.__wbg_setsize_fcb45dd943200af4=((a,b)=>{c(a).size=b>>>R});b.wbg.__wbg_value_5e860795f53217cd=((b,d)=>{const e=c(d).value;const f=o(e,a.__wbindgen_malloc,a.__wbindgen_realloc);const g=l;r()[b/a0+ T]=g;r()[b/a0+ R]=f});b.wbg.__wbg_setvalue_7d187f6cc23d8192=((a,b,d)=>{c(a).value=j(b,d)});b.wbg.__wbg_clipboardData_9df31a82d48f5917=(a=>{const b=c(a).clipboardData;return p(b)?R:k(b)});b.wbg.__wbg_items_ab26358161f1c090=(a=>{const b=c(a).items;return k(b)});b.wbg.__wbg_files_1825fef0f844d3c7=(a=>{const b=c(a).files;return p(b)?R:k(b)});b.wbg.__wbg_getData_8a2880812d381455=function(){return E(((b,d,e,f)=>{const g=c(d).getData(j(e,f));const h=o(g,a.__wbindgen_malloc,a.__wbindgen_realloc);const i=l;r()[b/a0+ T]=i;r()[b/a0+ R]=h}),arguments)};b.wbg.__wbg_dataTransfer_6faae0d5a11fbb55=(a=>{const b=c(a).dataTransfer;return p(b)?R:k(b)});b.wbg.__wbg_getItem_c81cd3ae30cd579a=function(){return E(((b,d,e,f)=>{const g=c(d).getItem(j(e,f));var h=p(g)?R:o(g,a.__wbindgen_malloc,a.__wbindgen_realloc);var i=l;r()[b/a0+ T]=i;r()[b/a0+ R]=h}),arguments)};b.wbg.__wbg_setItem_fe04f524052a3839=function(){return E(((a,b,d,e,f)=>{c(a).setItem(j(b,d),j(e,f))}),arguments)};b.wbg.__wbg_deltaX_1cd49e80ca3599f6=(a=>{const b=c(a).deltaX;return b});b.wbg.__wbg_deltaY_b9ab90e34f3a0f1d=(a=>{const b=c(a).deltaY;return b});b.wbg.__wbg_deltaMode_eeaea4efbd95e3d5=(a=>{const b=c(a).deltaMode;return b});b.wbg.__wbg_top_4c7f1ff83300d0a8=(a=>{const b=c(a).top;return b});b.wbg.__wbg_left_28b38696ec8237b7=(a=>{const b=c(a).left;return b});b.wbg.__wbg_addEventListener_0f2891b0794e07fa=function(){return E(((a,b,d,e)=>{c(a).addEventListener(j(b,d),c(e))}),arguments)};b.wbg.__wbg_removeEventListener_104d11302bb212d1=function(){return E(((a,b,d,e)=>{c(a).removeEventListener(j(b,d),c(e))}),arguments)};b.wbg.__wbg_clipboard_95d63bc1acbf4881=(a=>{const b=c(a).clipboard;return p(b)?R:k(b)});b.wbg.__wbg_userAgent_2c548c522dca04cc=function(){return E(((b,d)=>{const e=c(d).userAgent;const f=o(e,a.__wbindgen_malloc,a.__wbindgen_realloc);const g=l;r()[b/a0+ T]=g;r()[b/a0+ R]=f}),arguments)};b.wbg.__wbg_size_3f52fa5fdd6ff84c=(a=>{const b=c(a).size;return b});b.wbg.__wbg_type_bf5cb977901c6a29=((b,d)=>{const e=c(d).type;const f=o(e,a.__wbindgen_malloc,a.__wbindgen_realloc);const g=l;r()[b/a0+ T]=g;r()[b/a0+ R]=f});b.wbg.__wbg_arrayBuffer_47d6dbeb91d823b0=(a=>{const b=c(a).arrayBuffer();return k(b)});b.wbg.__wbg_length_1172ab9213274731=(a=>{const b=c(a).length;return b});b.wbg.__wbg_get_3519b46be2694573=((a,b)=>{const d=c(a)[b>>>R];return p(d)?R:k(d)});b.wbg.__wbg_href_92490614763f3f7c=function(){return E(((b,d)=>{const e=c(d).href;const f=o(e,a.__wbindgen_malloc,a.__wbindgen_realloc);const g=l;r()[b/a0+ T]=g;r()[b/a0+ R]=f}),arguments)};b.wbg.__wbg_origin_57ece1d4025136f7=function(){return E(((b,d)=>{const e=c(d).origin;const f=o(e,a.__wbindgen_malloc,a.__wbindgen_realloc);const g=l;r()[b/a0+ T]=g;r()[b/a0+ R]=f}),arguments)};b.wbg.__wbg_protocol_a741904865edbf7b=function(){return E(((b,d)=>{const e=c(d).protocol;const f=o(e,a.__wbindgen_malloc,a.__wbindgen_realloc);const g=l;r()[b/a0+ T]=g;r()[b/a0+ R]=f}),arguments)};b.wbg.__wbg_host_d470610a8b06b8ee=function(){return E(((b,d)=>{const e=c(d).host;const f=o(e,a.__wbindgen_malloc,a.__wbindgen_realloc);const g=l;r()[b/a0+ T]=g;r()[b/a0+ R]=f}),arguments)};b.wbg.__wbg_hostname_223f3958820b8269=function(){return E(((b,d)=>{const e=c(d).hostname;const f=o(e,a.__wbindgen_malloc,a.__wbindgen_realloc);const g=l;r()[b/a0+ T]=g;r()[b/a0+ R]=f}),arguments)};b.wbg.__wbg_port_1b1e83008357b3c9=function(){return E(((b,d)=>{const e=c(d).port;const f=o(e,a.__wbindgen_malloc,a.__wbindgen_realloc);const g=l;r()[b/a0+ T]=g;r()[b/a0+ R]=f}),arguments)};b.wbg.__wbg_search_08fbba2309a249da=function(){return E(((b,d)=>{const e=c(d).search;const f=o(e,a.__wbindgen_malloc,a.__wbindgen_realloc);const g=l;r()[b/a0+ T]=g;r()[b/a0+ R]=f}),arguments)};b.wbg.__wbg_hash_ced9ee31706e591d=function(){return E(((b,d)=>{const e=c(d).hash;const f=o(e,a.__wbindgen_malloc,a.__wbindgen_realloc);const g=l;r()[b/a0+ T]=g;r()[b/a0+ R]=f}),arguments)};b.wbg.__wbg_length_13c945f2ba35096e=(a=>{const b=c(a).length;return b});b.wbg.__wbg_get_666f4cd7c4a405fe=((a,b)=>{const d=c(a)[b>>>R];return p(d)?R:k(d)});b.wbg.__wbg_preventDefault_9299867e06da6909=(a=>{c(a).preventDefault()});b.wbg.__wbg_stopPropagation_ead0c9b0b27f2bd4=(a=>{c(a).stopPropagation()});b.wbg.__wbg_clientX_61d53edfc3453552=(a=>{const b=c(a).clientX;return b});b.wbg.__wbg_clientY_32145ace1ef7c9c0=(a=>{const b=c(a).clientY;return b});b.wbg.__wbg_ctrlKey_be79eb9c26bb9db2=(a=>{const b=c(a).ctrlKey;return b});b.wbg.__wbg_shiftKey_785a75b4a861011d=(a=>{const b=c(a).shiftKey;return b});b.wbg.__wbg_metaKey_ed354cc496f6ca35=(a=>{const b=c(a).metaKey;return b});b.wbg.__wbg_button_22121917aaba48d0=(a=>{const b=c(a).button;return b});b.wbg.__wbg_identifier_0478801bc7c7da33=(a=>{const b=c(a).identifier;return b});b.wbg.__wbg_pageX_8f9f73e9eda097b9=(a=>{const b=c(a).pageX;return b});b.wbg.__wbg_pageY_ca193fad7a8e4808=(a=>{const b=c(a).pageY;return b});b.wbg.__wbg_force_91a13997e3285882=(a=>{const b=c(a).force;return b});b.wbg.__wbg_length_a13f45ba5cb39dde=(a=>{const b=c(a).length;return b});b.wbg.__wbg_item_e6c23588e9241398=((a,b)=>{const d=c(a).item(b>>>R);return p(d)?R:k(d)});b.wbg.__wbg_get_4d9a3223de44c024=((a,b)=>{const d=c(a)[b>>>R];return p(d)?R:k(d)});b.wbg.__wbg_keyCode_15d04e58393aaaf1=(a=>{const b=c(a).keyCode;return b});b.wbg.__wbg_altKey_f384daa388a44745=(a=>{const b=c(a).altKey;return b});b.wbg.__wbg_ctrlKey_ac674c31f44bd157=(a=>{const b=c(a).ctrlKey;return b});b.wbg.__wbg_shiftKey_a741da931809868b=(a=>{const b=c(a).shiftKey;return b});b.wbg.__wbg_metaKey_d37dd650c2a748a7=(a=>{const b=c(a).metaKey;return b});b.wbg.__wbg_isComposing_1b855d2209c1e15c=(a=>{const b=c(a).isComposing;return b});b.wbg.__wbg_key_ab25ddd694dd43f3=((b,d)=>{const e=c(d).key;const f=o(e,a.__wbindgen_malloc,a.__wbindgen_realloc);const g=l;r()[b/a0+ T]=g;r()[b/a0+ R]=f});b.wbg.__wbg_touches_fa37087324bdee9b=(a=>{const b=c(a).touches;return k(b)});b.wbg.__wbg_changedTouches_435db3a2341b533f=(a=>{const b=c(a).changedTouches;return k(b)});b.wbg.__wbg_width_0ad17fa8ba1e2189=(a=>{const b=c(a).width;return b});b.wbg.__wbg_height_825e522e5c1788ba=(a=>{const b=c(a).height;return b});b.wbg.__wbg_instanceof_HtmlCanvasElement_838d8b92f3c55028=(a=>{let b;try{b=c(a) instanceof HTMLCanvasElement}catch(a){b=!1}const d=b;return d});b.wbg.__wbg_width_b813b325b323728a=(a=>{const b=c(a).width;return b});b.wbg.__wbg_setwidth_06b3724e3657b03e=((a,b)=>{c(a).width=b>>>R});b.wbg.__wbg_height_646e862bac72cff1=(a=>{const b=c(a).height;return b});b.wbg.__wbg_setheight_20af00b46a00cb54=((a,b)=>{c(a).height=b>>>R});b.wbg.__wbg_getContext_a29bad1d160bec3d=function(){return E(((a,b,d)=>{const e=c(a).getContext(j(b,d));return p(e)?R:k(e)}),arguments)};b.wbg.__wbg_writeText_0252c45753724f4d=((a,b,d)=>{const e=c(a).writeText(j(b,d));return k(e)});b.wbg.__wbg_setProperty_de108d2e8182d9c0=function(){return E(((a,b,d,e,f)=>{c(a).setProperty(j(b,d),j(e,f))}),arguments)};b.wbg.__wbg_bindVertexArrayOES_9b5e1523bc4318a9=((a,b)=>{c(a).bindVertexArrayOES(c(b))});b.wbg.__wbg_createVertexArrayOES_b9a61604d56a51c7=(a=>{const b=c(a).createVertexArrayOES();return p(b)?R:k(b)});b.wbg.__wbg_now_0669e62508913829=(a=>{const b=c(a).now();return b});b.wbg.__wbg_name_6443ed5608a826ef=((b,d)=>{const e=c(d).name;const f=o(e,a.__wbindgen_malloc,a.__wbindgen_realloc);const g=l;r()[b/a0+ T]=g;r()[b/a0+ R]=f});b.wbg.__wbg_lastModified_95cb14b2ccff3ec5=(a=>{const b=c(a).lastModified;return b});b.wbg.__wbg_data_af325f86d262b9bd=((b,d)=>{const e=c(d).data;var f=p(e)?R:o(e,a.__wbindgen_malloc,a.__wbindgen_realloc);var g=l;r()[b/a0+ T]=g;r()[b/a0+ R]=f});b.wbg.__wbg_type_2b9819e2d120de58=((b,d)=>{const e=c(d).type;const f=o(e,a.__wbindgen_malloc,a.__wbindgen_realloc);const g=l;r()[b/a0+ T]=g;r()[b/a0+ R]=f});b.wbg.__wbg_matches_b15a28b7adb4d51b=(a=>{const b=c(a).matches;return b});b.wbg.__wbg_matches_0a9a53388a67ca88=(a=>{const b=c(a).matches;return b});b.wbg.__wbg_parentElement_592cb54944d3d002=(a=>{const b=c(a).parentElement;return p(b)?R:k(b)});b.wbg.__wbg_appendChild_2e6a6c9d1f0d443d=function(){return E(((a,b)=>{const d=c(a).appendChild(c(b));return k(d)}),arguments)};b.wbg.__wbg_get_0ee8ea3c7c984c45=((a,b)=>{const d=c(a)[b>>>R];return k(d)});b.wbg.__wbg_length_161c0d89c6535c1d=(a=>{const b=c(a).length;return b});b.wbg.__wbg_newnoargs_cfecb3965268594c=((a,b)=>{const c=new Function(j(a,b));return k(c)});b.wbg.__wbg_call_3f093dd26d5569f8=function(){return E(((a,b)=>{const d=c(a).call(c(b));return k(d)}),arguments)};b.wbg.__wbg_self_05040bd9523805b9=function(){return E((()=>{const a=self.self;return k(a)}),arguments)};b.wbg.__wbg_window_adc720039f2cb14f=function(){return E((()=>{const a=window.window;return k(a)}),arguments)};b.wbg.__wbg_globalThis_622105db80c1457d=function(){return E((()=>{const a=globalThis.globalThis;return k(a)}),arguments)};b.wbg.__wbg_global_f56b013ed9bcf359=function(){return E((()=>{const a=global.global;return k(a)}),arguments)};b.wbg.__wbg_resolve_5da6faf2c96fd1d5=(a=>{const b=Promise.resolve(c(a));return k(b)});b.wbg.__wbg_then_f9e58f5a50f43eae=((a,b)=>{const d=c(a).then(c(b));return k(d)});b.wbg.__wbg_then_20a5920e447d1cb1=((a,b,d)=>{const e=c(a).then(c(b),c(d));return k(e)});b.wbg.__wbg_buffer_b914fb8b50ebbc3e=(a=>{const b=c(a).buffer;return k(b)});b.wbg.__wbg_newwithbyteoffsetandlength_42904a72cefa1e00=((a,b,d)=>{const e=new Int8Array(c(a),b>>>R,d>>>R);return k(e)});b.wbg.__wbg_newwithbyteoffsetandlength_0aafe9b39ed85f71=((a,b,d)=>{const e=new Int16Array(c(a),b>>>R,d>>>R);return k(e)});b.wbg.__wbg_newwithbyteoffsetandlength_9ca2c1faeb430732=((a,b,d)=>{const e=new V(c(a),b>>>R,d>>>R);return k(e)});b.wbg.__wbg_newwithbyteoffsetandlength_0de9ee56e9f6ee6e=((a,b,d)=>{const e=new S(c(a),b>>>R,d>>>R);return k(e)});b.wbg.__wbg_new_b1f2d6842d615181=(a=>{const b=new S(c(a));return k(b)});b.wbg.__wbg_set_7d988c98e6ced92d=((a,b,d)=>{c(a).set(c(b),d>>>R)});b.wbg.__wbg_length_21c4b0ae73cba59d=(a=>{const b=c(a).length;return b});b.wbg.__wbg_newwithbyteoffsetandlength_8c2171d5a9b7f791=((a,b,d)=>{const e=new Uint16Array(c(a),b>>>R,d>>>R);return k(e)});b.wbg.__wbg_newwithbyteoffsetandlength_7f2d9491ea8c746e=((a,b,d)=>{const e=new Uint32Array(c(a),b>>>R,d>>>R);return k(e)});b.wbg.__wbg_newwithbyteoffsetandlength_5fd0a60d38f47fa6=((a,b,d)=>{const e=new Float32Array(c(a),b>>>R,d>>>R);return k(e)});b.wbg.__wbindgen_debug_string=((b,d)=>{const e=u(c(d));const f=o(e,a.__wbindgen_malloc,a.__wbindgen_realloc);const g=l;r()[b/a0+ T]=g;r()[b/a0+ R]=f});b.wbg.__wbindgen_throw=((a,b)=>{throw new Q(j(a,b))});b.wbg.__wbindgen_memory=(()=>{const b=a.memory;return k(b)});b.wbg.__wbindgen_closure_wrapper2236=((a,b,c)=>{const d=w(a,b,a1,x);return k(d)});b.wbg.__wbindgen_closure_wrapper2238=((a,b,c)=>{const d=w(a,b,a1,y);return k(d)});b.wbg.__wbindgen_closure_wrapper2240=((a,b,c)=>{const d=w(a,b,a1,z);return k(d)});b.wbg.__wbindgen_closure_wrapper2448=((a,b,c)=>{const d=w(a,b,778,A);return k(d)});return b});var A=((b,c,d)=>{a.wasm_bindgen__convert__closures__invoke1_mut__h3a7d5cca9907e335(b,c,k(d))});var t=(()=>{if(s===N||s.byteLength===R){s=new Float64Array(a.memory.buffer)};return s});var y=((b,c)=>{try{const g=a.__wbindgen_add_to_stack_pointer(-$);a._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h57d2ea0576337531(g,b,c);var d=r()[g/a0+ R];var e=r()[g/a0+ T];if(e){throw f(d)}}finally{a.__wbindgen_add_to_stack_pointer($)}});var e=(a=>{if(a<132)return;b[a]=d;d=a});var w=((b,c,d,e)=>{const f={a:b,b:c,cnt:T,dtor:d};const g=(...b)=>{f.cnt++;const c=f.a;f.a=R;try{return e(c,f.b,...b)}finally{if(--f.cnt===R){a.__wbindgen_export_2.get(f.dtor)(c,f.b);v.unregister(f)}else{f.a=c}}};g.original=f;v.register(g,f,f);return g});var o=((a,b,c)=>{if(c===M){const c=m.encode(a);const d=b(c.length,T)>>>R;i().subarray(d,d+ c.length).set(c);l=c.length;return d};let d=a.length;let e=b(d,T)>>>R;const f=i();let g=R;for(;g<d;g++){const b=a.charCodeAt(g);if(b>127)break;f[e+ g]=b};if(g!==d){if(g!==R){a=a.slice(g)};e=c(e,d,d=g+ a.length*3,T)>>>R;const b=i().subarray(e+ g,e+ d);const f=n(a,b);g+=f.written;e=c(e,d,g,T)>>>R};l=g;return e});var i=(()=>{if(h===N||h.byteLength===R){h=new S(a.memory.buffer)};return h});var j=((a,b)=>{a=a>>>R;return g.decode(i().subarray(a,a+ b))});var I=((b,c)=>{a=b.exports;K.__wbindgen_wasm_module=c;s=N;q=N;h=N;a.__wbindgen_start();return a});let a;const b=new L(128).fill(M);b.push(M,N,!0,!1);let d=b.length;const g=typeof TextDecoder!==O?new TextDecoder(P,{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Q(`TextDecoder not available`)}};if(typeof TextDecoder!==O){g.decode()};let h=N;let l=R;const m=typeof TextEncoder!==O?new TextEncoder(P):{encode:()=>{throw Q(`TextEncoder not available`)}};const n=typeof m.encodeInto===U?((a,b)=>m.encodeInto(a,b)):((a,b)=>{const c=m.encode(a);b.set(c);return {read:a.length,written:c.length}});let q=N;let s=N;const v=typeof _===O?{register:()=>{},unregister:()=>{}}:new _(b=>{a.__wbindgen_export_2.get(b.dtor)(b.a,b.b)});function B(){let b;let c;try{const f=a.__wbindgen_add_to_stack_pointer(-$);a.read_data(f);var d=r()[f/a0+ R];var e=r()[f/a0+ T];b=d;c=e;return j(d,e)}finally{a.__wbindgen_add_to_stack_pointer($);a.__wbindgen_free(b,c,T)}}function C(b){const c=o(b,a.__wbindgen_malloc,a.__wbindgen_realloc);const d=l;a.set_data(c,d)}function D(b,c){const d=o(b,a.__wbindgen_malloc,a.__wbindgen_realloc);const e=l;const f=o(c,a.__wbindgen_malloc,a.__wbindgen_realloc);const g=l;a.add(d,e,f,g)}export default K;export{B as read_data,C as set_data,D as add,J as initSync}