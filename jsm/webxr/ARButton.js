class ARButton {

    static createButton(renderer, sessionInit = {}) {

        const button = document.createElement('button');



        function showStartAR( /*device*/) {

            let currentSession = null;

            function onSessionStarted(session) {

                session.addEventListener('end', onSessionEnded);
                renderer.xr.setReferenceSpaceType('local');
                renderer.xr.setSession(session);
                button.remove();
                currentSession = session;
                // document.getElementById("logo1").style.opacity = '0';
            }

            function onSessionEnded( /*event*/) {

                currentSession.removeEventListener('end', onSessionEnded);

                button.textContent = 'START AR EXPERIENCE';

                currentSession = null;

            }

            //

            button.style.display = '';
            // button.style.visibility = "hidden";

            button.style.cursor = 'pointer';
            button.style.left = 'calc(50% - 50px)';
            button.style.width = '100px';

            // button.innerHTML = '<i class="fas fa-vr-cardboard"></i>';
            button.innerHTML = '<img class="arrow_icon" src="./resources/images/arrow_dark.png">';

            button.onmouseenter = function () {

                button.style.opacity = '1.0';

            };

            button.onmouseleave = function () {

                button.style.opacity = '0.5';

            };

            button.onclick = function () {

                if (document.getElementById("cup_position_img") != null) {
                    document.getElementById("cup_position_img").style.display = "none";
                }
                //style="opacity: 0;"
                if (document.getElementById("ques") != null) {
                    document.getElementById("ques").style = "opacity: 100%;";
                }

                if (currentSession === null) {

                    navigator.xr.requestSession('immersive-ar', sessionInit).then(onSessionStarted);

                } else {

                    window.location.href = "https://redmindtechnologies.com/LavazzaWeb/lavazza_AR_development/LavazzaCupDetect.html";
                }
            };

        }

        function disableButton() {

            button.style.display = '';

            button.style.cursor = 'auto';
            button.style.left = 'calc(50% - 75px)';
            button.style.width = '150px';

            button.onmouseenter = null;
            button.onmouseleave = null;

            button.onclick = null;

        }

        function showARNotSupported() {

            disableButton();

            button.innerHTML = 'AR NOT SUPPORTED';

            button.style.display = 'block';
        }

        function stylizeElement(element) {

            element.style.position = 'absolute';
            element.style.bottom = '40%';
            // element.style.padding = '5px';
            // element.style.border = '1px solid #fff';
            element.style.border = 'unset';
            // element.style.borderRadius = '4px';
            element.style.background = 'transparent';
            // element.style.color = 'white';
            // element.style.font = 'normal 20px sans-serif';
            element.style.textAlign = 'center';
            element.style.opacity = '0.5';
            element.style.outline = 'none';
            element.style.zIndex = '999';

        }

        if ('xr' in navigator) {

            button.id = 'ARButton';
            button.style.display = 'none';

            stylizeElement(button);

            navigator.xr.isSessionSupported('immersive-ar').then(function (supported) {

                supported ? showStartAR() : showARNotSupported();

            }).catch(showARNotSupported);

            return button;
        } else {

            const message = document.createElement('a');

            if (window.isSecureContext === false) {

                message.href = document.location.href.replace(/^http:/, 'https:');
                message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message

            } else {

                message.href = 'https://immersiveweb.dev/';
                // alert("Your browser is not supported, Please install webxr viewer for the AR Experince.");
                var r = confirm("Your Browser does not support Web XR. Please click OK to install");
                if (r == true) {
                    window.location.href = 'https://apps.apple.com/us/app/webxr-viewer/id1295998056';
                } else {
                    // txt = "You pressed Cancel!";
                }
                message.innerHTML = 'WEBXR NOT AVAILABLE';

            }

            message.style.left = 'calc(50% - 90px)';
            message.style.width = '180px';
            message.style.textDecoration = 'none';

            stylizeElement(message);

            return message;

        }

    }

}

export { ARButton };